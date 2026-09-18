import React, { useEffect, useMemo, useState } from "react";
import { Heart, Search, ShoppingCart, Star, SlidersHorizontal, Store, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http";
import { useCart } from "../../../zustand/cartStore";
import { useSearchParams } from "react-router-dom";

function Card({ book }) {
  const addToCart = useCart((state) => state.addToCart);
  const stock = Number(book.quantity ?? 0);
  const finalPrice = Math.round(Number(book.price || 0) * (1 - Number(book.discount || 0) / 100));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
      <div className="relative h-64 bg-slate-100">
        <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"><Heart size={17} /></button>
        {Number(book.discount) > 0 && (
          <span className="absolute left-3 bottom-3 rounded-md bg-green-100 text-green-700 px-2 py-1 text-xs font-semibold">
            {book.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-blue-600 font-bold uppercase">{book.category}</span>
        <h3 className="font-bold mt-2">{book.title}</h3>
        <p className="text-sm text-slate-500">{book.author}</p>
        <div className="flex items-center gap-1 text-yellow-500 mt-2"><Star size={14} fill="currentColor" /><span className="text-sm">4.8</span></div>
        <div className="mt-3 text-xs text-slate-500 flex items-center gap-1"><Store size={13} />{book.store?.storeName || "BookVerse Store"}</div>
        {book.store && <div className="mt-1 text-xs text-slate-400 flex items-center gap-1"><MapPin size={13} />{book.store.city}, {book.store.state}</div>}
        <div className="flex items-center mt-3">
          <strong className="text-lg">₹{finalPrice}</strong>
          {Number(book.discount) > 0 && <del className="ml-2 text-sm text-slate-400">₹{book.price}</del>}
          <button
            disabled={stock <= 0}
            onClick={() => { addToCart({ ...book, price: finalPrice }); toast.success(`${book.title} added to cart`); }}
            className="ml-auto bg-blue-50 text-blue-600 p-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            title={stock <= 0 ? "Out of stock" : "Add to cart"}
          >
            <ShoppingCart size={17} />
          </button>
        </div>
        <p className={`mt-2 text-xs font-semibold ${stock <= 0 ? "text-red-500" : stock <= 5 ? "text-orange-500" : "text-green-600"}`}>
          {stock <= 0 ? "Out of stock" : `${stock} in stock`}
        </p>
      </div>
    </div>
  );
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    httpRequest.get("/products")
      .then(({ data }) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => toast.error(err?.response?.data?.message || "Unable to load books"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(books.map((b) => b.category).filter(Boolean))], [books]);

  const filteredBooks = useMemo(() => {
    let result = books.filter((book) => {
      const text = `${book.title} ${book.author} ${book.category} ${book.store?.storeName || ""}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (category === "All" || book.category === category);
    });
    if (sort === "low") result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "high") result.sort((a, b) => Number(b.price) - Number(a.price));
    return result;
  }, [books, search, category, sort]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-blue-600">CATALOGUE</p>
        <h1 className="text-3xl font-bold mt-1">Explore books</h1>
        <p className="text-slate-500 mt-2">Books listed by BookVerse stores.</p>
      </div>

      <div className="bg-white border rounded-2xl p-4 mb-7 flex flex-col lg:flex-row gap-3">
        <div className="flex items-center gap-3 border rounded-xl px-4 h-11 flex-1">
          <Search size={18} className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books, authors, stores..." className="outline-none w-full" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-xl px-4 h-11">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-xl px-4 h-11">
          <option value="popular">Newest</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option>
        </select>
      </div>

      {loading ? <div className="bg-white border rounded-2xl p-16 text-center">Loading books...</div> :
        <div className="flex gap-7">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border rounded-2xl p-5">
              <div className="flex items-center gap-2 font-bold mb-6"><SlidersHorizontal size={17} />Filters</div>
              <p className="text-sm text-slate-500">Use the search, category and price sorting controls above.</p>
            </div>
          </aside>
          <div className="flex-1">
            <div className="mb-4 text-sm text-slate-500">{filteredBooks.length} books found</div>
            {filteredBooks.length === 0 ? <div className="bg-white border rounded-2xl p-16 text-center"><h3 className="font-bold text-lg">No books found</h3></div> :
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{filteredBooks.map((book) => <Card key={book._id} book={book} />)}</div>}
          </div>
        </div>}
    </div>
  );
}
