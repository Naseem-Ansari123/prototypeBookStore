import React from "react";
import {
  MapPin,
  Star,
  Store,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Readers Hub",
    location: "Malad, Mumbai",
    books: 1240,
    rating: 4.8,
    orders: 2341,
    description:
      "A modern independent bookstore specialising in technology and self-development.",
  },
  {
    id: 2,
    name: "The Study Shelf",
    location: "Andheri, Mumbai",
    books: 890,
    rating: 4.7,
    orders: 1784,
    description:
      "Academic, competitive examination and professional books.",
  },
  {
    id: 3,
    name: "TechBooks India",
    location: "Pune, Maharashtra",
    books: 650,
    rating: 4.9,
    orders: 1420,
    description:
      "Programming, software engineering and computer science books.",
  },
  {
    id: 4,
    name: "Paper & Ink",
    location: "Delhi, India",
    books: 2150,
    rating: 4.6,
    orders: 3200,
    description:
      "Fiction, classics, biographies and lifestyle books.",
  },
];

export default function BookStores() {
  return (
    <div>

      <div className="mb-8">
        <p className="text-xs tracking-widest font-bold text-blue-600">
          MARKETPLACE
        </p>

        <h1 className="text-3xl font-bold mt-1">
          Book Stores
        </h1>

        <p className="text-slate-500 mt-2">
          Discover trusted independent bookstores.
        </p>
      </div>

      {/* STORE HERO */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white mb-8">

        <div className="max-w-2xl">

          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <ShieldCheck size={18} />
            Verified marketplace
          </div>

          <h2 className="text-3xl font-bold mt-3">
            Shop from real bookstores
          </h2>

          <p className="mt-3 text-blue-50">
            Compare books across independent sellers,
            discover local stores and support small businesses.
          </p>

        </div>

      </div>

      {/* STORES */}

      <div className="grid md:grid-cols-2 gap-5">

        {stores.map((store) => (
          <Link
            to={`/stores/${store.id}`}
            key={store.id}
            className="bg-white border rounded-2xl p-6 hover:shadow-xl transition"
          >

            <div className="flex gap-4">

              <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Store size={30} />
              </div>

              <div className="flex-1">

                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-bold text-lg">
                      {store.name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin size={14} />
                      {store.location}
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400"
                  />

                </div>

                <p className="text-sm text-slate-500 mt-4">
                  {store.description}
                </p>

                <div className="flex gap-5 mt-5 text-sm">

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    <strong>{store.rating}</strong>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500">
                    <BookOpen size={15} />
                    {store.books} books
                  </div>

                  <div className="text-slate-500">
                    {store.orders}+ orders
                  </div>

                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}