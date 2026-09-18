import React from "react";
import { Minus, Plus, Trash2, ShoppingCart, Truck, ShieldCheck, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../zustand/cartStore";

export default function Cart() {
  const { items, increase, decrease, remove } = useCart();

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const discount = subtotal >= 1000 ? 100 : 0;
  const total = subtotal - discount;

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-blue-600">YOUR BAG</p>
        <h1 className="text-3xl font-bold mt-1">Shopping Cart</h1>
        <p className="text-slate-500 mt-2">{items.length} book type(s) in your cart.</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border rounded-2xl p-16 text-center">
          <ShoppingCart size={45} className="mx-auto text-slate-300" />
          <h2 className="font-bold text-xl mt-4">Your cart is empty</h2>
          <Link to="/user/books" className="inline-flex mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold">Explore books</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          <div className="space-y-4">
            <div className="bg-white border rounded-2xl overflow-hidden">
              {items.map((item) => (
                <div key={item._id} className="p-5 border-b last:border-b-0 flex gap-5">
                  <img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.author}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.store?.storeName || "BookVerse Store"}</p>
                    <p className="text-blue-600 font-bold mt-3">₹{item.price}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => decrease(item._id)} className="p-2"><Minus size={14} /></button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => increase(item._id)} className="p-2"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => remove(item._id)} className="text-red-500 text-sm flex items-center gap-1"><Trash2 size={15} />Remove</button>
                    </div>
                  </div>
                  <strong>₹{Number(item.price || 0) * item.quantity}</strong>
                </div>
              ))}
            </div>
            <div className="bg-white border rounded-2xl p-5 flex gap-4">
              <Truck className="text-blue-600" />
              <div><strong>Free delivery</strong><p className="text-sm text-slate-500 mt-1">Standard delivery is included.</p></div>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-6 h-fit">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <div className="space-y-4 mt-6 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><strong>₹{subtotal}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Delivery</span><strong className="text-green-600">FREE</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Discount</span><strong className="text-green-600">-₹{discount}</strong></div>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between text-lg"><span>Total</span><strong>₹{total}</strong></div>
            <Link to="/user/checkout" className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white font-bold flex justify-center">Proceed to checkout</Link>
            <div className="flex gap-2 mt-5 text-xs text-slate-500"><ShieldCheck size={16} />Secure checkout and protected payment</div>
          </div>
        </div>
      )}
    </div>
  );
}
