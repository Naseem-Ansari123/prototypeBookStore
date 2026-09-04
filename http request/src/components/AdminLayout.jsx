import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Package,
  Wallet,
  Store,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSession } from "../../zustand/useSession";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);

  const { admin, adminLogout } = useSession((state) => state);

  // ================================
  // NAVIGATION ITEMS
  // ================================

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Books",
      path: "/admin/books",
      icon: BookOpen,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
      badge: 3,
    },
    {
      name: "Inventory",
      path: "/admin/inventory",
      icon: Package,
    },
    {
      name: "Earnings",
      path: "/admin/earnings",
      icon: Wallet,
    },
    {
      name: "Store",
      path: "/admin/store",
      icon: Store,
    },
  ];

  // ================================
  // CLOSE PROFILE ON OUTSIDE CLICK
  // ================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================================
  // ESCAPE KEY
  // ================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ================================
  // PREVENT BODY SCROLL
  // ================================

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // ================================
  // LOGOUT
  // ================================

  const handleLogout = () => {
    adminLogout();

    setProfileOpen(false);
    setSidebarOpen(false);

    navigate("/");
  };

  // ================================
  // SEARCH
  // ================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/admin/books?search=${encodeURIComponent(query)}`);

    setSearch("");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300

          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">

          <NavLink
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h1 className="bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-xl font-bold text-transparent">
                BookVerse
              </h1>

              <p className="text-[10px] text-slate-400">
                Seller Dashboard
              </p>
            </div>

          </NavLink>

          {/* Mobile close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Manage Store
          </p>

          <nav className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl
                    px-3 py-3 text-sm font-medium
                    transition-all

                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    }
                    `
                  }
                >

                  <Icon className="h-[18px] w-[18px] shrink-0" />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}

                </NavLink>
              );
            })}

          </nav>

          {/* Divider */}

          <div className="my-6 border-t border-slate-100" />

          {/* Settings */}

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <NavLink
            to="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `
              flex items-center gap-3 rounded-xl px-3 py-3
              text-sm font-medium transition

              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }
              `
            }
          >
            <Settings className="h-[18px] w-[18px]" />
            Settings
          </NavLink>

          {/* Store Preview */}

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-4 text-white">

            <Store className="mb-3 h-6 w-6" />

            <h3 className="text-sm font-semibold">
              Your Store
            </h3>

            <p className="mt-1 text-xs leading-5 text-indigo-100">
              See how your bookstore looks to customers.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-xs font-semibold text-indigo-600 transition hover:bg-slate-100"
            >
              View Store
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

          </div>

        </div>

        {/* =====================================
            SIDEBAR USER
        ===================================== */}

        <div className="border-t border-slate-100 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=lulijJbr2GN2zgp2Ps_hM"
              alt="Profile"
              className="h-10 w-10 rounded-full bg-white"
            />

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold capitalize text-slate-800">
                {admin?.admin?.adminName || "Seller"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {admin?.admin?.email || ""}
              </p>

            </div>

          </div>

        </div>

      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="min-h-screen lg:ml-72">

        {/* =====================================
            TOP NAVBAR
        ===================================== */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

          <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">

            {/* Mobile menu */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}

            <form
              onSubmit={handleSearch}
              className="flex-1"
            >

              <div className="relative mx-auto max-w-2xl">

                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search books, orders..."
                  className="
                    w-full rounded-xl border
                    border-slate-200 bg-slate-50
                    py-3 pl-11 pr-4
                    text-sm text-slate-700
                    outline-none transition

                    placeholder:text-slate-400

                    focus:border-indigo-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-100
                  "
                />

              </div>

            </form>

            {/* Notification */}

            <button
              className="
                relative flex h-10 w-10
                shrink-0 items-center justify-center
                rounded-xl text-slate-600
                transition hover:bg-slate-100
              "
              aria-label="Notifications"
            >

              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-500" />

            </button>

            {/* Profile */}

            <div
              ref={profileRef}
              className="relative"
            >

              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="
                  flex items-center gap-2
                  rounded-full border border-slate-200
                  p-1 pr-2 transition
                  hover:border-indigo-300
                  hover:bg-slate-50
                "
              >

                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=lulijJbr2GN2zgp2Ps_hM"
                  alt="Profile"
                  className="h-8 w-8 rounded-full bg-slate-100"
                />

                <ChevronDown
                  className={`
                    hidden h-4 w-4
                    text-slate-400
                    transition-transform
                    sm:block

                    ${profileOpen ? "rotate-180" : ""}
                  `}
                />

              </button>

              {/* Profile dropdown */}

              {profileOpen && (
                <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                  <div className="border-b border-slate-100 px-3 py-3">

                    <p className="truncate text-sm font-semibold capitalize text-slate-800">
                      {admin?.admin?.adminName || "Seller"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {admin?.admin?.email || ""}
                    </p>

                  </div>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* =====================================
            PAGE CONTENT
        ===================================== */}

        <main className="min-h-[calc(100vh-72px)] p-4 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-7xl">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
