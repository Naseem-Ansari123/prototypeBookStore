import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl shadow-lg">
            📚
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-2xl font-bold text-transparent">
              BookVerse
            </h1>
            <p className="text-xs text-slate-500">
              Science & Technology Library
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            { name: "Home", path: "/" },
            { name: "Books", path: "/books" },
            { name: "Categories", path: "/categories" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group relative font-medium text-slate-700 transition hover:text-cyan-600"
            >
              {item.name}

              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="hidden lg:flex">
          <input
            type="text"
            placeholder="Search books..."
            className="w-64 rounded-full border border-slate-300 bg-slate-100 px-5 py-2 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-cyan-500 px-5 py-2 font-medium text-cyan-600 transition hover:bg-cyan-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-cyan-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;