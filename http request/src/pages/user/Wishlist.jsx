import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http";
import { useCart } from "../../../zustand/cartStore";

export default function Wishlist() {
  const [books, setBooks] = useState([]);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    httpRequest.get("/products")
      .then(({ data }) => setBooks(data.slice(0, 3)))
      .catch((err) => toast.error(err?.response?.data?.message || "Unable to load wishlist"));
  }, []);

  return <div>
    <div className="flex justify-between items-end mb-8">
      <div><p className="text-xs font-bold tracking-widest text-blue-600">SAVED BOOKS</p><h1 className="text-3xl font-bold mt-1">Wishlist</h1><p className="text-slate-500 mt-2">Save books and move them to your cart.</p></div>
      <span className="text-sm text-slate-500">{books.length} saved</span>
    </div>
    <div className="space-y-4">
      {books.map((book) => <div key={book._id} className="bg-white border rounded-2xl p-4 flex gap-5 items-center">
        <img src={book.image} alt={book.title} className="w-24 h-32 object-cover rounded-xl" />
        <div className="flex-1"><span className="text-xs font-bold text-blue-600 uppercase">{book.category}</span><h3 className="text-lg font-bold mt-1">{book.title}</h3><p className="text-sm text-slate-500">{book.author}</p><div className="flex items-center gap-1 text-yellow-500 mt-2"><Star size={15} fill="currentColor"/>4.8</div><strong className="text-xl block mt-3">₹{Math.round(Number(book.price) * (1-Number(book.discount||0)/100))}</strong></div>
        <div className="flex gap-2"><button onClick={() => { addToCart({ ...book, price: Math.round(Number(book.price) * (1-Number(book.discount||0)/100)) }); toast.success("Added to cart"); }} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2"><ShoppingCart size={16}/>Add to cart</button><button className="p-2 rounded-lg border text-red-500"><Trash2 size={17}/></button></div>
      </div>)}
      {!books.length && <div className="bg-white border rounded-2xl p-12 text-center text-slate-500">No saved books yet.</div>}
    </div>
    <div className="mt-8 bg-blue-50 rounded-2xl p-6 flex items-center justify-between"><div><h3 className="font-bold">Looking for something else?</h3><p className="text-sm text-slate-500 mt-1">Explore books available from BookVerse stores.</p></div><Link to="/user/books" className="text-blue-600 font-semibold flex items-center gap-1">Explore<ArrowRight size={16}/></Link></div>
  </div>;
}
