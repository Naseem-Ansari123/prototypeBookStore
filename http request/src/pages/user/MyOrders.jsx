import React, { useEffect, useState } from "react";
import { Package, CheckCircle, Clock, Search, Truck } from "lucide-react";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http";
import { useSession } from "../../../zustand/useSession";

export default function MyOrders() {
  const { user } = useSession();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    httpRequest.get("/orders/mine", { headers: { Authorization: `Bearer ${user?.token}` } })
      .then(({ data }) => setOrders(data))
      .catch((err) => toast.error(err?.response?.data?.message || "Unable to load orders"));
  }, [user?.token]);

  const filtered = orders.filter((o) => {
    const matchesFilter = filter === "All" || o.status === filter;
    const q = search.toLowerCase();
    return matchesFilter && (!q || String(o.orderId).toLowerCase().includes(q) || o.items?.some((i) => i.title.toLowerCase().includes(q)));
  });

  return <div>
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
      <div><p className="text-xs font-bold tracking-widest text-blue-600">PURCHASE HISTORY</p><h1 className="text-3xl font-bold mt-1">My Orders</h1><p className="text-slate-500 mt-2">Track your BookVerse purchases.</p></div>
      <div className="flex items-center gap-2 border rounded-xl px-4 h-11 bg-white"><Search size={17} className="text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order..." className="outline-none text-sm w-40" /></div>
    </div>
    <div className="flex gap-2 mb-6 overflow-x-auto">{["All","Placed","Shipped","Delivered","Cancelled"].map((x) => <button key={x} onClick={() => setFilter(x)} className={`px-4 py-2 rounded-xl text-sm font-semibold ${filter === x ? "bg-blue-600 text-white" : "bg-white border text-slate-600"}`}>{x}</button>)}</div>
    <div className="space-y-4">
      {filtered.map((order) => <div key={order._id} className="bg-white border rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Package size={22}/></div>
          <div className="flex-1"><div className="flex gap-3 items-center flex-wrap"><strong>Order #{order.orderId}</strong><span className="px-2 py-1 rounded-md bg-green-50 text-green-600 text-xs font-bold">{order.status}</span><span className="text-xs text-slate-400">{order.paymentStatus}</span></div>
            <p className="text-sm text-slate-500 mt-2">{order.items?.map((i) => `${i.title} × ${i.quantity}`).join(", ")}</p>
            <p className="text-xs text-slate-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <strong className="text-lg">₹{order.total}</strong>
        </div>
      </div>)}
      {!filtered.length && <div className="bg-white border rounded-2xl p-16 text-center"><Clock size={42} className="mx-auto text-slate-300"/><h3 className="font-bold text-lg mt-4">No orders found</h3></div>}
    </div>
  </div>;
}
