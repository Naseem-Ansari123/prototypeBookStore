import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">

      {/* ================= DESKTOP / MAIN NAVBAR ================= */}
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl shadow-md sm:h-11 sm:w-11 sm:text-2xl">
            📚
          </div>

          <div className="min-w-0">
            <h1 className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-lg font-bold text-transparent sm:text-xl lg:text-2xl">
              BookVerse
            </h1>

            <p className="hidden text-[10px] text-slate-500 sm:block sm:text-xs">
              Science & Technology Library
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative font-medium transition ${
                  isActive
                    ? "text-cyan-600"
                    : "text-slate-700 hover:text-cyan-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden xl:block">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search books..."
              className="w-56 rounded-full border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 transition hover:bg-cyan-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-95 md:hidden"
        >
          <div className="relative h-5 w-5">

            <span
              className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition-all duration-300 ${
                isMenuOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-all duration-300 ${
                isMenuOpen
                  ? "-translate-y-1.5 -rotate-45"
                  : ""
              }`}
            />

          </div>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pb-5 pt-4 sm:px-6">

          {/* Mobile Search */}
          <div className="relative mb-4">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search books..."
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-cyan-50 text-cyan-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-cyan-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl border border-cyan-500 py-2.5 text-center text-sm font-medium text-cyan-600 transition hover:bg-cyan-50"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-center text-sm font-medium text-white shadow-md transition hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;