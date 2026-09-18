import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Store,
} from "lucide-react";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    oldPrice: 699,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 799,
    oldPrice: 999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    price: 899,
    oldPrice: 1199,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  },
  {
    id: 4,
    title: "Ikigai",
    author: "Héctor García",
    price: 349,
    oldPrice: 499,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
  },
];

function BookCard({ book }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white flex items-center justify-center shadow">
          <Heart size={17} />
        </button>

        <span className="absolute left-3 bottom-3 rounded-md bg-green-100 text-green-700 px-2 py-1 text-xs font-semibold">
          {Math.round((1 - book.price / book.oldPrice) * 100)}% OFF
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold uppercase">
          Bestseller
        </p>

        <h3 className="mt-1 font-bold text-slate-800">
          {book.title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {book.author}
        </p>

        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          <Star size={15} fill="currentColor" />
          <span className="text-sm font-semibold">
            {book.rating}
          </span>
        </div>

        <div className="flex items-center mt-3">
          <strong className="text-lg">₹{book.price}</strong>

          <del className="ml-2 text-sm text-slate-400">
            ₹{book.oldPrice}
          </del>

          <button className="ml-auto h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-12">

      {/* HERO */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
        <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-14 items-center">

          <div>
            <p className="text-sm font-bold tracking-widest text-blue-600">
              YOUR ONLINE BOOK MARKETPLACE
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight text-slate-900">
              Find your next
              <span className="block text-blue-600">
                great read.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-slate-600 leading-7">
              Discover books from independent bookstores,
              compare prices, save your favourites and get
              them delivered to your doorstep.
            </p>

            <div className="flex gap-3 mt-7">
              <Link
                to="/books"
                className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700"
              >
                Explore books
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/stores"
                className="px-5 py-3 rounded-xl bg-white border border-slate-200 font-semibold"
              >
                Browse stores
              </Link>
            </div>
          </div>

          {/* BOOK VISUAL */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-80">

              <div className="absolute top-8 left-10 w-40 h-56 bg-blue-600 rounded-xl rotate-[-12deg] shadow-2xl flex items-center justify-center text-white">
                <BookOpen size={60} />
              </div>

              <div className="absolute top-14 right-8 w-40 h-56 bg-white rounded-xl rotate-[12deg] shadow-2xl flex items-center justify-center text-blue-600">
                <BookOpen size={60} />
              </div>

              <div className="absolute bottom-0 left-24 w-40 h-56 bg-yellow-400 rounded-xl rotate-[3deg] shadow-2xl flex items-center justify-center">
                <BookOpen size={60} />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl p-6 flex gap-4">
          <ShieldCheck className="text-blue-600" />
          <div>
            <h3 className="font-bold">Verified stores</h3>
            <p className="text-sm text-slate-500 mt-1">
              Shop confidently from verified sellers.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 flex gap-4">
          <Truck className="text-blue-600" />
          <div>
            <h3 className="font-bold">Track your order</h3>
            <p className="text-sm text-slate-500 mt-1">
              Know where your books are at every step.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 flex gap-4">
          <Store className="text-blue-600" />
          <div>
            <h3 className="font-bold">Independent sellers</h3>
            <p className="text-sm text-slate-500 mt-1">
              Support local bookstores.
            </p>
          </div>
        </div>

      </section>

      {/* TRENDING */}
      <section>
        <div className="flex justify-between items-end mb-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600">
              TRENDING NOW
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Popular this week
            </h2>
          </div>

          <Link
            to="/books"
            className="text-blue-600 font-semibold text-sm flex items-center gap-1"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

    </div>
  );
}