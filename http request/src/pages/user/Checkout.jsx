import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShieldCheck, CreditCard, MapPin } from "lucide-react";
import { httpRequest } from "../../lib/http";
import { useSession } from "../../../zustand/useSession";
import { useCart } from "../../../zustand/cartStore";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useSession();
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ fullName: user?.user?.username || "", address: "", city: "", state: "", pincode: "", phone: "" });

  const subtotal = useMemo(() => items.reduce((s, i) => s + Number(i.price || 0) * i.quantity, 0), [items]);
  const discount = subtotal >= 1000 ? 100 : 0;
  const total = subtotal - discount;

  const headers = { Authorization: `Bearer ${user?.token || ""}` };

  const setField = (e) => setAddress((p) => ({ ...p, [e.target.name]: e.target.value }));

  const placeOrder = async () => {
    if (!items.length) return toast.error("Your cart is empty");
    if (!address.fullName || !address.address || !address.city || !address.state || !address.pincode) {
      return toast.error("Please complete the delivery address");
    }

    try {
      setLoading(true);
      const payload = { items: items.map((i) => ({ productId: i._id, quantity: i.quantity })) };
      const { data: payment } = await httpRequest.post("/orders/create", payload, { headers });

      const confirm = async (paymentData) => {
        const { data } = await httpRequest.post("/orders/confirm", {
          ...payload,
          orderId: payment.orderId,
          shippingAddress: address,
          paymentStatus: "paid",
          ...paymentData,
        }, { headers });
        clear();
        toast.success("Payment successful and order placed");
        navigate(`/user/orders?order=${data.order.orderId}`);
      };

      if (payment.gateway === "razorpay") {
        if (!window.Razorpay) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => openRazorpay(payment, confirm);
          script.onerror = () => toast.error("Unable to load payment gateway");
          document.body.appendChild(script);
        } else {
          openRazorpay(payment, confirm);
        }
      } else {
        // Development mode: no Razorpay keys required.
        await confirm({ paymentMethod: "Demo payment", paymentId: `demo_${Date.now()}`, gateway: "demo" });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = (payment, confirm) => {
    const rzp = new window.Razorpay({
      key: payment.keyId,
      amount: payment.amount,
      currency: payment.currency,
      name: "BookVerse",
      description: "Book purchase",
      order_id: payment.gatewayOrderId,
      prefill: { name: address.fullName, email: user?.user?.email || "", contact: address.phone },
      theme: { color: "#2563eb" },
      handler: async (response) => {
        try {
          await confirm({
            gateway: "razorpay",
            paymentMethod: "Razorpay",
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        } catch (err) {
          toast.error(err?.response?.data?.message || "Payment verification failed");
        } finally {
          setLoading(false);
        }
      },
      modal: { ondismiss: () => setLoading(false) },
    });
    rzp.open();
  };

  if (!items.length) return <div className="bg-white border rounded-2xl p-12 text-center"><h2 className="text-xl font-bold">Cart is empty</h2><button onClick={() => navigate("/user/books")} className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl">Browse books</button></div>;

  return (
    <div>
      <div className="mb-8"><p className="text-xs font-bold tracking-widest text-blue-600">SECURE CHECKOUT</p><h1 className="text-3xl font-bold mt-1">Checkout</h1><p className="text-slate-500 mt-2">Confirm delivery details and complete your payment.</p></div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-5">
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex items-center gap-2 font-bold mb-5"><MapPin size={19} className="text-blue-600" />Delivery address</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["fullName","Full name"],["phone","Phone"],["city","City"],["state","State"],["pincode","Pincode"]
              ].map(([name,label]) => <input key={name} name={name} value={address[name]} onChange={setField} placeholder={label} className="border rounded-xl px-4 py-3 outline-none focus:border-blue-500" />)}
              <textarea name="address" value={address.address} onChange={setField} placeholder="Complete address" rows="3" className="sm:col-span-2 border rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3"><ShieldCheck className="text-blue-600 shrink-0" /><div><strong>Payment security</strong><p className="text-sm text-slate-600 mt-1">Prices and stock are rechecked by the server before an order is recorded.</p></div></div>
        </div>

        <div className="bg-white border rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-lg">Order summary</h2>
          <div className="mt-5 space-y-3">{items.map((i) => <div key={i._id} className="flex justify-between text-sm"><span>{i.title} × {i.quantity}</span><strong>₹{i.price * i.quantity}</strong></div>)}</div>
          <hr className="my-5" />
          <div className="flex justify-between text-sm"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
          <div className="flex justify-between text-sm mt-3"><span>Discount</span><strong className="text-green-600">-₹{discount}</strong></div>
          <div className="flex justify-between text-xl mt-5"><strong>Total</strong><strong>₹{total}</strong></div>
          <button disabled={loading} onClick={placeOrder} className="mt-6 w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold flex justify-center gap-2 disabled:opacity-60"><CreditCard size={18} />{loading ? "Processing..." : "Pay & Place Order"}</button>
          <p className="text-xs text-slate-400 text-center mt-3">Demo mode works locally. Add Razorpay keys for real test payments.</p>
        </div>
      </div>
    </div>
  );
}
