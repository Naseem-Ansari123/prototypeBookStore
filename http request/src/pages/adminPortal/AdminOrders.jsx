import React, { useEffect, useState } from "react";
import { Package, RefreshCw, IndianRupee } from "lucide-react";
import { toast } from "react-toastify";
import { useAdminSession } from "../../../zustand/adminSession";

export default function AdminOrders() {
  const { admin } = useAdminSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/orders/admin", {
        headers: { Authorization: `Bearer ${admin?.token || ""}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to load orders");
      setOrders(data);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (admin?.token) load(); }, [admin?.token]);

  const storeItems = orders.flatMap((o) => o.items.filter((i) => i.admin_id === admin?.admin?.id));

  return <div>
    <div className="flex items-center justify-between mb-7">
      <div><p className="text-xs font-bold tracking-widest text-indigo-600">STORE SALES</p><h1 className="text-3xl font-bold mt-1">Orders</h1><p className="text-slate-500 mt-2">Only paid orders containing books from your store are shown.</p></div>
      <button onClick={load} className="border rounded-xl px-4 py-2 flex items-center gap-2">{loading ? <RefreshCw className="animate-spin" size={17}/> : <RefreshCw size={17}/>} Refresh</button>
    </div>

    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white border rounded-2xl p-5"><p className="text-sm text-slate-500">Orders</p><strong className="text-2xl">{orders.length}</strong></div>
      <div className="bg-white border rounded-2xl p-5"><p className="text-sm text-slate-500">Units sold</p><strong className="text-2xl">{storeItems.reduce((s,i)=>s+i.quantity,0)}</strong></div>
      <div className="bg-white border rounded-2xl p-5"><p className="text-sm text-slate-500">Revenue</p><strong className="text-2xl">₹{storeItems.reduce((s,i)=>s+Number(i.lineTotal||0),0).toLocaleString("en-IN")}</strong></div>
    </div>

    <div className="space-y-4">
      {orders.map((order) => {
        const items = order.items.filter((i) => i.admin_id === admin?.admin?.id);
        const revenue = items.reduce((s, i) => s + Number(i.lineTotal || 0), 0);
        return <div key={order._id} className="bg-white border rounded-2xl p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Package size={21}/></div>
            <div className="flex-1"><strong>#{order.orderId}</strong><p className="text-sm text-slate-500 mt-1">{order.items.map(i=>`${i.title} × ${i.quantity}`).join(", ")}</p><p className="text-xs text-slate-400 mt-1">Customer: {order.shippingAddress?.fullName || "Customer"} · {new Date(order.createdAt).toLocaleString()}</p></div>
            <div className="text-right"><strong className="text-lg">₹{revenue}</strong><p className="text-xs text-green-600 font-semibold mt-1">Paid · {order.status}</p></div>
          </div>
        </div>;
      })}
      {!orders.length && <div className="bg-white border rounded-2xl p-14 text-center text-slate-500">No paid orders for this store yet.</div>}
    </div>
  </div>;
}
