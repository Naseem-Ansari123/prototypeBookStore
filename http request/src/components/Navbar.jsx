
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  BookOpen,
} from "lucide-react";

import { useSession } from "../../zustand/useSession";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);

  const { user, logout } = useSession((state) => state);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  // Close menus when Escape is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    toast.success("Logout Successfull")
    setTimeout(()=>{
      navigate("/");
    },3000)
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    // Change this route according to your project
    navigate(`/books?search=${encodeURIComponent(query)}`);

    setSearch("");
    closeMobileMenu();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">

      {/* ================= NAVBAR ================= */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[70px] sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex min-w-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md transition duration-300 group-hover:scale-105 group-hover:shadow-lg sm:h-11 sm:w-11">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-lg font-bold text-transparent sm:text-xl lg:text-2xl">
              BookVerse
            </h1>

            <p className="hidden truncate text-[10px] text-slate-500 sm:block sm:text-xs">
              Science & Technology Library
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative py-2 text-sm font-medium transition-colors duration-200 xl:text-base ${isActive
                  ? "text-cyan-600"
                  : "text-slate-700 hover:text-cyan-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* ================= DESKTOP SEARCH ================= */}
        <form
          onSubmit={handleSearch}
          className="hidden xl:block"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
              aria-label="Search books"
              className="w-52 rounded-full border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:w-60 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </form>

        {/* ================= DESKTOP AUTH ================= */}
        <div className="hidden items-center gap-2 md:flex">

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 transition-all duration-200 hover:bg-cyan-50 active:scale-95"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div
              ref={profileRef}
              className="relative"
            >
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 transition-all duration-200 hover:border-cyan-300 hover:bg-slate-50"
              >
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=lulijJbr2GN2zgp2Ps_hM"
                  alt="Profile"
                  className="h-9 w-9 rounded-full bg-slate-100"
                />

                <span className="hidden max-w-24 truncate text-sm font-medium text-slate-700 xl:block">
                  {user?.user?.username || "User"}
                </span>

                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-semibold capitalize text-slate-800">
                      {user?.user?.username || "User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user?.user?.email || ""}
                    </p>
                  </div>

                  <Link
                    to="/apps/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 active:scale-95 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${isMenuOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6">

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="relative mb-4"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
              aria-label="Search books"
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </form>

          {/* Mobile Navigation */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                    ? "bg-cyan-50 text-cyan-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-cyan-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Authentication */}
          <div className="mt-4 border-t border-slate-100 pt-4">

            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-cyan-500 py-3 text-center text-sm font-medium text-cyan-600 transition hover:bg-cyan-50 active:scale-95"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-center text-sm font-medium text-white shadow-md transition hover:shadow-lg active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-3">

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/bottts/svg?seed=lulijJbr2GN2zgp2Ps_hM"
                    alt="Profile"
                    className="h-11 w-11 rounded-full bg-white"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold capitalize text-slate-800">
                      {user?.user?.username || "User"}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {user?.user?.email || ""}
                    </p>
                  </div>
                </div>

                {/* Profile */}
                <Link
                  to="/apps/profile"
                  onClick={closeMobileMenu}
                  className="mt-3 flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
