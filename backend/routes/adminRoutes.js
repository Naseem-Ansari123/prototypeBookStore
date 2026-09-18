const express = require("express");
const router = express.Router();
const { adminSchema } = require("../schema/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../middleware/auth");

router.get("/", (req, res) => res.send("hello admin"));

router.post("/register", async (req, res) => {
  try {
    const required = ["storeName", "ownerName", "email", "phoneNo", "password", "address", "city", "state", "pincode"];
    const missing = required.find((field) => !String(req.body[field] ?? "").trim());
    if (missing) return res.status(400).json({ message: `${missing} is required`, ok: false });
    if (req.body.password.length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters", ok: false });

    const email = req.body.email.trim().toLowerCase();
    const existing = await adminSchema.findOne({ email });
    if (existing) return res.status(409).json({ message: "Seller email already exists", ok: false });

    const data = await adminSchema.create({
      ...req.body,
      email,
      storeName: req.body.storeName.trim(),
      ownerName: req.body.ownerName.trim(),
      phoneNo: req.body.phoneNo.trim(),
    });

    return res.status(201).json({
      message: "Seller account registered successfully",
      ok: true,
      admin: { id: data._id.toString(), adminName: data.ownerName, email: data.email, storeName: data.storeName },
    });
  } catch (error) {
    console.error("Admin register error:", error);
    return res.status(400).json({ message: error.message, ok: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const admin = await adminSchema.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isLogin = await bcrypt.compare(password, admin.password);
    if (!isLogin) return res.status(401).json({ message: "Invalid email or password" });

    const tokenPayload = {
      id: admin._id.toString(),
      adminName: admin.ownerName,
      email: admin.email,
      storeName: admin.storeName,
      address: admin.address,
      city: admin.city,
      state: admin.state,
      pincode: admin.pincode,
      logoUri: admin.logoUri || "",
      role: "admin",
    };

    const token = jwt.sign(tokenPayload, secret, { expiresIn: "7d" });
    return res.json({ message: "Login successful", admin: tokenPayload, token });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Unable to login right now" });
  }
});

router.get("/me", require("../middleware/auth").requireAdmin, async (req, res) => {
  const admin = await adminSchema.findById(req.auth.id).select("-password").lean();
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.json({ admin });
});

module.exports = router;
