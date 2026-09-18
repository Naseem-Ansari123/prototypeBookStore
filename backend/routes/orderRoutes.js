const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { dbConnection } = require("../config/db");
const { requireUser, requireAdmin } = require("../middleware/auth");
const crypto = require("crypto");
let Razorpay;
try { Razorpay = require("razorpay"); } catch { Razorpay = null; }

const calculateCart = async (items) => {
  if (!Array.isArray(items) || items.length === 0) throw new Error("Cart is empty");

  const ids = items.map((item) => item.productId || item._id).filter((id) => ObjectId.isValid(id));
  if (ids.length !== items.length) throw new Error("Invalid product in cart");

  const db = await dbConnection();
  const products = await db.collection("data").find({ _id: { $in: ids.map((id) => new ObjectId(id)) } }).toArray();

  if (products.length !== ids.length) throw new Error("One or more books are no longer available");

  const byId = new Map(products.map((p) => [p._id.toString(), p]));
  const normalized = [];
  let subtotal = 0;

  for (const requested of items) {
    const product = byId.get(String(requested.productId || requested._id));
    const quantity = Math.max(1, Number(requested.quantity || 1));
    const stock = Number(product.quantity ?? 0);

    if (quantity > stock) throw new Error(`${product.title} has only ${stock} item(s) in stock`);

    const unitPrice = Math.max(0, Number(product.price || 0)) * (1 - Math.min(100, Math.max(0, Number(product.discount || 0))) / 100);
    const lineTotal = Math.round(unitPrice * quantity * 100) / 100;
    subtotal += lineTotal;

    normalized.push({
      productId: product._id,
      admin_id: String(product.admin_id || ""),
      storeId: String(product.storeId || product.admin_id || ""),
      title: product.title,
      author: product.author || "",
      image: product.image || "",
      quantity,
      unitPrice,
      lineTotal,
    });
  }

  const discount = subtotal >= 1000 ? 100 : 0;
  return { items: normalized, subtotal, discount, total: Math.max(0, subtotal - discount) };
};

router.post("/preview", requireUser, async (req, res) => {
  try {
    const result = await calculateCart(req.body.items);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/create", requireUser, async (req, res) => {
  try {
    const result = await calculateCart(req.body.items);
    const orderId = `BV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let gateway = "demo";
    let gatewayOrderId = orderId;

    if (Razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const rpOrder = await razorpay.orders.create({
        amount: Math.round(result.total * 100),
        currency: "INR",
        receipt: orderId,
      });
      gateway = "razorpay";
      gatewayOrderId = rpOrder.id;
    }

    res.status(201).json({
      orderId,
      gatewayOrderId,
      gateway,
      keyId: process.env.RAZORPAY_KEY_ID || null,
      amount: Math.round(result.total * 100),
      displayAmount: result.total,
      currency: "INR",
      items: result.items,
      subtotal: result.subtotal,
      discount: result.discount,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/confirm", requireUser, async (req, res) => {
  const session = await dbConnection();
  const orders = session.collection("orders");
  const products = session.collection("data");

  try {
    const result = await calculateCart(req.body.items);

    if (req.body.gateway === "razorpay") {
      if (!process.env.RAZORPAY_KEY_SECRET || !req.body.razorpay_order_id || !req.body.razorpay_payment_id || !req.body.razorpay_signature) {
        return res.status(400).json({ message: "Incomplete Razorpay payment details" });
      }
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`)
        .digest("hex");
      if (expectedSignature !== req.body.razorpay_signature) {
        return res.status(400).json({ message: "Payment signature verification failed" });
      }
    }

    const paymentStatus = req.body.paymentStatus || "paid";
    if (!["paid", "failed"].includes(paymentStatus)) return res.status(400).json({ message: "Invalid payment status" });

    if (paymentStatus === "failed") return res.status(400).json({ message: "Payment failed" });

    const shippingAddress = req.body.shippingAddress || {};
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ message: "Complete delivery address is required" });
    }

    const now = new Date();
    const order = {
      orderId: req.body.orderId || `BV-${Date.now()}`,
      userId: req.auth.id,
      items: result.items,
      subtotal: result.subtotal,
      discount: result.discount,
      total: result.total,
      paymentStatus: "paid",
      paymentMethod: req.body.paymentMethod || "Demo / Razorpay",
      paymentId: req.body.paymentId || req.body.razorpay_payment_id || null,
      status: "Placed",
      shippingAddress,
      createdAt: now,
      updatedAt: now,
    };

    // Atomic stock decrement. If any book cannot be reserved, no order is created.
    for (const item of result.items) {
      const stockUpdate = await products.updateOne(
        { _id: item.productId, quantity: { $gte: item.quantity } },
        { $inc: { quantity: -item.quantity } }
      );
      if (stockUpdate.modifiedCount !== 1) {
        return res.status(409).json({ message: `${item.title} is no longer available in the requested quantity` });
      }
    }

    await orders.insertOne(order);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Confirm order error:", error);
    res.status(500).json({ message: error.message || "Unable to place order" });
  }
});

router.get("/mine", requireUser, async (req, res) => {
  const db = await dbConnection();
  const orders = await db.collection("orders").find({ userId: req.auth.id }).sort({ createdAt: -1 }).toArray();
  res.json(orders);
});

router.get("/admin", requireAdmin, async (req, res) => {
  const db = await dbConnection();
  const orders = await db.collection("orders")
    .find({ "items.admin_id": req.auth.id, paymentStatus: "paid" })
    .sort({ createdAt: -1 })
    .toArray();
  res.json(orders);
});

router.get("/admin/summary", requireAdmin, async (req, res) => {
  const db = await dbConnection();
  const orders = await db.collection("orders").find({ "items.admin_id": req.auth.id, paymentStatus: "paid" }).toArray();

  const storeItems = orders.flatMap((order) => order.items.filter((item) => item.admin_id === req.auth.id));
  const revenue = storeItems.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);
  const units = storeItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  res.json({ ordersCount: orders.length, units, revenue, recentOrders: orders.slice(0, 5) });
});

module.exports = router;
