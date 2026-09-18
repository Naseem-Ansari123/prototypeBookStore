import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Eye,
  ShoppingCart,
  MapPin,
  Store,
  Search,
  X,
  ChevronRight,
  Package,
  User,
  Tag,
} from "lucide-react";

const Homepage = () => {
  const api = "http://localhost:8080/products";

  // =====================================================
  // STATE
  // =====================================================

  const [fetchData, setFetchData] = useState([]);
  const [stores, setStores] = useState({});

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [previewProduct, setPreviewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    {
      name: "Programming",
      icon: "💻",
      text: "Code & Development",
    },
    {
      name: "AI",
      icon: "🤖",
      text: "Artificial Intelligence",
    },
    {
      name: "Science",
      icon: "🔬",
      text: "Explore Science",
    },
    {
      name: "Mathematics",
      icon: "🧮",
      text: "Logic & Numbers",
    },
    {
      name: "Engineering",
      icon: "⚙️",
      text: "Build the Future",
    },
    {
      name: "Novels",
      icon: "📖",
      text: "Stories & Fiction",
    },
  ];

  // =====================================================
  // FETCH BOOKS + STORE INFORMATION
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // -------------------------------------------------
        // 1. Fetch all books
        // -------------------------------------------------

        const response = await fetch(api);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const books = await response.json();

        console.log("Products received from backend:", books);

        const validBooks = Array.isArray(books) ? books : [];

        setFetchData(validBooks);

        // -------------------------------------------------
        // 2. Get unique admin IDs
        // -------------------------------------------------

        const adminIds = [
          ...new Set(
            validBooks
              .map((book) => book.admin_id)
              .filter(Boolean)
          ),
        ];

        console.log("Unique Admin IDs:", adminIds);

        // -------------------------------------------------
        // 3. Fetch each admin ONLY ONCE
        // -------------------------------------------------

        const storeResults = await Promise.all(
          adminIds.map(async (adminId) => {
            try {
              const res = await fetch(
                `http://localhost:8080/users/${adminId}`
              );

              if (!res.ok) {
                throw new Error(
                  `Failed to fetch admin ${adminId}`
                );
              }

              const admin = await res.json();

              // Create complete address
              const completeAddress =
                admin.completeAddress ||
                [
                  admin.address,
                  admin.city,
                  admin.state,
                  admin.pincode,
                ]
                  .filter(Boolean)
                  .join(", ");

              return [
                adminId,
                {
                  storeName:
                    admin.storeName || "Unknown Store",

                  completeAddress:
                    completeAddress || "Unknown Location",

                  logoUri: admin.logoUri || "",
                },
              ];
            } catch (error) {
              console.error(
                `Store fetch error for ${adminId}:`,
                error
              );

              return [
                adminId,
                {
                  storeName: "Unknown Store",
                  completeAddress: "Unknown Location",
                  logoUri: "",
                },
              ];
            }
          })
        );

        // -------------------------------------------------
        // 4. Convert array into object
        // -------------------------------------------------

        const storeMap = Object.fromEntries(storeResults);

        console.log("Store cache:", storeMap);

        setStores(storeMap);
      } catch (error) {
        console.error("Homepage loading error:", error);

        setFetchData([]);
        setStores({});
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =====================================================
  // HELPERS
  // =====================================================

  const getQuantity = (book) => {
    return Number(book?.quantity ?? 0);
  };

  const getFinalPrice = (book) => {
    const price = Number(book?.price ?? 0);
    const discount = Number(book?.discount ?? 0);

    return Math.max(
      0,
      price - (price * discount) / 100
    );
  };

  // =====================================================
  // GET STORE FROM CACHE
  // =====================================================

  const getStore = (adminId) => {
    return (
      stores[adminId] || {
        storeName: "Unknown Store",
        completeAddress: "Unknown Location",
        logoUri: "",
      }
    );
  };

  // =====================================================
  // STOCK TEXT
  // =====================================================

  const getStockText = (quantity) => {
    if (quantity <= 0) return "Out of stock";

    if (quantity <= 5) {
      return `Only ${quantity} left`;
    }

    return `${quantity} available`;
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // =====================================================
  // SCROLL TO CATEGORIES
  // =====================================================

  const scrollToCategories = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =====================================================
  // FILTER BOOKS
  // =====================================================

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return fetchData.filter((book) => {
      // -------------------------------------------------
      // Category
      // -------------------------------------------------

      const matchesCategory =
        selectedCategory === "All" ||
        String(book.category || "")
          .toLowerCase()
          .includes(selectedCategory.toLowerCase());

      // -------------------------------------------------
      // Store information from CACHE
      // -------------------------------------------------

      const store = getStore(book.admin_id);

      const storeName = store.storeName || "Unknown Store";

      const location =
        store.completeAddress || "Unknown Location";

      // -------------------------------------------------
      // Search
      // -------------------------------------------------

      const matchesSearch =
        !query ||
        String(book.title || "")
          .toLowerCase()
          .includes(query) ||
        String(book.author || "")
          .toLowerCase()
          .includes(query) ||
        String(book.category || "")
          .toLowerCase()
          .includes(query) ||
        storeName.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [fetchData, selectedCategory, search, stores]);

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">

        <div className="absolute inset-0">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.25),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.3),transparent_35%)]" />

          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-3xl" />

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [-5, 4, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute right-[8%] top-[18%] hidden text-[110px] opacity-20 lg:block"
          >
            📚
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [5, -4, 5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-[12%] right-[25%] hidden text-[90px] opacity-10 lg:block"
          >
            📖
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [3, -3, 3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="absolute bottom-[20%] left-[8%] hidden text-[70px] opacity-10 md:block"
          >
            📕
          </motion.div>

        </div>

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                ✨ Knowledge starts here
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Discover books that

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                expand your universe.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
            >
              Explore programming, artificial intelligence,
              science, mathematics, engineering and thousands
              of fascinating books from around the world.
            </motion.p>

            {/* Search */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-8 max-w-2xl"
            >

              <div className="group flex items-center rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/15">

                <Search className="h-5 w-5 text-slate-300" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      document
                        .getElementById("books")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }
                  }}
                  placeholder="Search books, authors, categories, stores..."
                  className="ml-4 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400 sm:text-base"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="mt-7 flex flex-wrap gap-3"
            >

              <Link
                to="/books"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Books →
              </Link>

              <button
                onClick={scrollToCategories}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore Categories
              </button>

            </motion.div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

      </section>

      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            Find your interest
          </h2>

          <p className="mt-2 text-slate-500">
            Choose a category and discover books from our stores.
          </p>

        </div>

        <div className="mb-5 flex flex-wrap gap-2">

          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === "All"
                ? "bg-indigo-600 text-white shadow-lg"
                : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
            }`}
          >
            All Books
          </button>

          {categories.map((category) => (

            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);

                document
                  .getElementById("books")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category.name
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
              }`}
            >
              {category.icon} {category.name}
            </button>

          ))}

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {categories.map((category, index) => (

            <motion.button
              type="button"
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);

                document
                  .getElementById("books")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.07,
              }}
              whileHover={{
                y: -6,
              }}
              className={`group rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:shadow-xl ${
                selectedCategory === category.name
                  ? "border-cyan-400 ring-2 ring-cyan-100"
                  : "border-slate-200 hover:border-cyan-300"
              }`}
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl transition group-hover:scale-110 group-hover:bg-cyan-50">
                {category.icon}
              </div>

              <h3 className="mt-4 line-clamp-2 font-bold text-slate-800">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {category.text}
              </p>

              <div className="mt-3 text-xs font-semibold text-cyan-600">
                Explore →
              </div>

            </motion.button>

          ))}

        </div>

      </section>

      {/* =====================================================
          BOOK MARKETPLACE
      ===================================================== */}

      <section
        id="books"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="text-xl">
                🔥
              </span>

              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                BookVerse Marketplace
              </p>

            </div>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Books worth discovering
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {selectedCategory === "All"
                ? `${filteredBooks.length} books available`
                : `${filteredBooks.length} ${selectedCategory} books available`}
            </p>

          </div>

          <Link
            to="/books"
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
          >
            View all books
            <ChevronRight className="h-4 w-4" />
          </Link>

        </div>

        {/* Active filters */}

        {(search || selectedCategory !== "All") && (

          <div className="mb-5 flex flex-wrap items-center gap-2">

            {selectedCategory !== "All" && (

              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">

                <Tag className="h-3.5 w-3.5" />

                {selectedCategory}

                <button
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                  className="rounded-full hover:bg-indigo-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

              </span>

            )}

            {search && (

              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">

                Search: "{search}"

                <button
                  onClick={() => setSearch("")}
                  className="rounded-full hover:bg-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

              </span>

            )}

          </div>

        )}

        {/* Loading */}

        {loading ? (

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {Array.from({
              length: 10,
            }).map((_, index) => (

              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
              >

                <div className="aspect-[4/5] bg-slate-200" />

                <div className="space-y-3 p-3">

                  <div className="h-3 w-16 rounded bg-slate-200" />

                  <div className="h-4 w-3/4 rounded bg-slate-200" />

                  <div className="h-3 w-1/2 rounded bg-slate-200" />

                  <div className="h-8 rounded bg-slate-200" />

                </div>

              </div>

            ))}

          </div>

        ) : filteredBooks.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

              <Search className="h-7 w-7 text-slate-400" />

            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No books found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another title, author, category or store.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {filteredBooks.slice(0, 10).map((item, index) => {

              const quantity = getQuantity(item);

              const finalPrice =
                getFinalPrice(item);

              // ---------------------------------------------
              // Get cached store information
              // ---------------------------------------------

              const store = getStore(item.admin_id);

              const storeName =
                store.storeName ||
                "Unknown Store";

              const location =
                store.completeAddress ||
                "Unknown Location";

              const isWishlisted =
                wishlist.includes(item._id);

              return (

                <motion.div
                  key={item._id || index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}

                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.title || "Book"}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-5xl">
                        📚
                      </div>

                    )}

                    {/* Discount */}

                    {Number(item.discount) > 0 && (

                      <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-[9px] font-bold text-white shadow">
                        {item.discount}% OFF
                      </span>

                    )}

                    {/* Wishlist */}

                    <button
                      onClick={() =>
                        toggleWishlist(item._id)
                      }
                      aria-label="Add to wishlist"
                      className={`absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-110 ${
                        isWishlisted
                          ? "text-pink-600"
                          : "text-slate-500 hover:text-pink-500"
                      }`}
                    >

                      <Heart
                        className="h-4 w-4"
                        fill={
                          isWishlisted
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>

                    {/* Stock */}

                    <span
                      className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-[9px] font-bold shadow ${
                        quantity <= 0
                          ? "bg-red-500 text-white"
                          : quantity <= 5
                            ? "bg-amber-400 text-slate-900"
                            : "bg-white/95 text-green-700"
                      }`}
                    >
                      {getStockText(quantity)}
                    </span>

                  </div>

                  {/* Content */}

                  <div className="p-3">

                    {/* Category */}

                    <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-medium text-indigo-600">

                      <Tag className="h-3 w-3 shrink-0" />

                      {item.category || "General"}

                    </span>

                    {/* Title */}

                    <h3
                      title={item.title}
                      className="mt-2 line-clamp-2 min-h-[36px] text-sm font-bold text-slate-800"
                    >
                      {item.title || "Untitled Book"}
                    </h3>

                    {/* Author */}

                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">

                      <User className="h-3 w-3 shrink-0" />

                      <span className="truncate">
                        {item.author ||
                          "Unknown author"}
                      </span>

                    </div>

                    {/* Store */}

                    <div className="mt-2 flex items-start gap-1 text-[10px] text-slate-600">

                      <Store className="mt-0.5 h-3 w-3 shrink-0 text-indigo-500" />

                      <span
                        title={storeName}
                        className="line-clamp-1 font-semibold"
                      >
                        {storeName}
                      </span>

                    </div>

                    {/* Location */}

                    <div className="mt-1 flex items-start gap-1 text-[10px] text-slate-400">

                      <MapPin className="mt-0.5 h-3 w-3 shrink-0" />

                      <span
                        title={location}
                        className="line-clamp-1"
                      >
                        {location}
                      </span>

                    </div>

                    {/* Price */}

                    <div className="mt-3 flex items-center gap-2">

                      <span className="text-base font-bold text-indigo-600">
                        ₹{finalPrice.toFixed(0)}
                      </span>

                      {Number(item.discount) > 0 && (

                        <del className="text-[10px] text-slate-400">
                          ₹
                          {Number(
                            item.price || 0
                          ).toFixed(0)}
                        </del>

                      )}

                    </div>

                    {/* Rating */}

                    <div className="mt-2 flex items-center gap-1 text-xs">

                      <span className="text-yellow-400">
                        ★★★★★
                      </span>

                      <span className="text-slate-400">
                        4.8
                      </span>

                    </div>

                    {/* Actions */}

                    <div className="mt-3 grid grid-cols-2 gap-2">

                      <button
                        onClick={() =>
                          setPreviewProduct(item)
                        }
                        className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-[10px] font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                      >

                        <Eye className="h-3.5 w-3.5" />

                        Preview

                      </button>

                      <button
                        disabled={quantity <= 0}
                        onClick={() => {

                          if (quantity > 0) {

                            setPreviewProduct({
                              ...item,
                              buyMode: true,
                            });

                          }

                        }}
                        className="flex items-center justify-center gap-1 rounded-lg bg-indigo-600 px-2 py-2 text-[10px] font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >

                        <ShoppingCart className="h-3.5 w-3.5" />

                        {quantity > 0
                          ? "Buy Now"
                          : "Sold Out"}

                      </button>

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        )}

        {/* View all */}

        {filteredBooks.length > 10 && (

          <div className="mt-8 text-center">

            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              View all {filteredBooks.length} books

              <ChevronRight className="h-4 w-4" />

            </Link>

          </div>

        )}

      </section>

      {/* =====================================================
          BOOK PREVIEW MODAL
      ===================================================== */}

      {previewProduct && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setPreviewProduct(null)
          }
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Book Preview
                </p>

                <h2 className="mt-1 line-clamp-1 text-lg font-bold text-slate-800">
                  {previewProduct.title}
                </h2>

              </div>

              <button
                onClick={() =>
                  setPreviewProduct(null)
                }
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[220px_1fr]">

              {/* Image */}

              <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl bg-slate-100 shadow-sm">

                {previewProduct.image ? (

                  <img
                    src={previewProduct.image}
                    alt={previewProduct.title}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex aspect-[4/5] items-center justify-center text-6xl">
                    📚
                  </div>

                )}

              </div>

              {/* Details */}

              <div>

                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">

                  <Tag className="h-3.5 w-3.5" />

                  {previewProduct.category ||
                    "General"}

                </span>

                <h3 className="mt-3 text-2xl font-black text-slate-800">
                  {previewProduct.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                  <User className="h-4 w-4" />

                  {previewProduct.author ||
                    "Unknown author"}

                </p>

                {/* Price */}

                <div className="mt-4 flex flex-wrap items-center gap-3">

                  <span className="text-2xl font-black text-indigo-600">
                    ₹
                    {getFinalPrice(
                      previewProduct
                    ).toFixed(0)}
                  </span>

                  {Number(
                    previewProduct.discount
                  ) > 0 && (

                    <>
                      <del className="text-sm text-slate-400">
                        ₹
                        {Number(
                          previewProduct.price || 0
                        ).toFixed(0)}
                      </del>

                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
                        {previewProduct.discount}%
                        OFF
                      </span>
                    </>

                  )}

                </div>

                {/* Store information */}

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sold by
                  </p>

                  <div className="mt-2 flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <Store className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">

                      {(() => {

                        const store = getStore(
                          previewProduct.admin_id
                        );

                        return (
                          <>
                            <p className="font-bold text-slate-800">
                              {store.storeName}
                            </p>

                            <p className="mt-1 flex items-start gap-1 text-xs text-slate-500">

                              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                              <span>
                                {store.completeAddress}
                              </span>

                            </p>
                          </>
                        );

                      })()}

                    </div>

                  </div>

                </div>

                {/* Stock */}

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

                    <Package className="h-4 w-4 text-slate-600" />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Stock
                    </p>

                    <p
                      className={`text-sm font-bold ${
                        getQuantity(
                          previewProduct
                        ) <= 0
                          ? "text-red-600"
                          : getQuantity(
                                previewProduct
                              ) <= 5
                            ? "text-amber-600"
                            : "text-green-600"
                      }`}
                    >
                      {getStockText(
                        getQuantity(
                          previewProduct
                        )
                      )}
                    </p>

                  </div>

                </div>

                {/* Description */}

                <div className="mt-5">

                  <h4 className="font-bold text-slate-800">
                    About this book
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {previewProduct.description ||
                      "No description available for this book."}
                  </p>

                </div>

                {/* Buy */}

                <button
                  disabled={
                    getQuantity(
                      previewProduct
                    ) <= 0
                  }
                  onClick={() => {

                    if (
                      getQuantity(
                        previewProduct
                      ) > 0
                    ) {

                      console.log(
                        "Buy Now:",
                        previewProduct
                      );

                    }

                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >

                  <ShoppingCart className="h-5 w-5" />

                  {getQuantity(
                    previewProduct
                  ) > 0
                    ? "Buy Now"
                    : "Out of Stock"}

                </button>

                <p className="mt-2 text-center text-[11px] text-slate-400">
                  Product ID:{" "}
                  {previewProduct._id || "N/A"}
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      )}

      {/* =====================================================
          INTERACTIVE BOOK DISCOVERY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">

            <div>

              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-semibold text-purple-300">
                🎯 BOOK DISCOVERY
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                Not sure what to read?
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                Tell us what you're curious about and discover
                a world of books waiting for you.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                {[
                  "🤖 AI",
                  "💻 Coding",
                  "🔬 Science",
                  "🧮 Math",
                  "📖 Fiction",
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() => {

                      const name =
                        item.includes("AI")
                          ? "AI"
                          : item.includes("Coding")
                            ? "Programming"
                            : item.includes("Science")
                              ? "Science"
                              : item.includes("Math")
                                ? "Mathematics"
                                : "Novels";

                      setSelectedCategory(name);

                      document
                        .getElementById("books")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });

                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {item}
                  </button>

                ))}

              </div>

              <button
                onClick={() => {

                  setSelectedCategory("All");
                  setSearch("");

                  document
                    .getElementById("books")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });

                }}
                className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Find My Book →
              </button>

            </div>

            <div className="relative flex h-80 items-center justify-center">

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [-6, -2, -6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute w-40 overflow-hidden rounded-xl shadow-2xl"
              >

                {fetchData[0]?.image ? (

                  <img
                    src={fetchData[0].image}
                    alt=""
                    className="aspect-[4/5] w-full object-cover"
                  />

                ) : (

                  <div className="flex aspect-[4/5] items-center justify-center bg-white text-6xl">
                    📕
                  </div>

                )}

              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [7, 3, 7],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                }}
                className="absolute ml-40 w-40 overflow-hidden rounded-xl shadow-2xl"
              >

                {fetchData[1]?.image ? (

                  <img
                    src={fetchData[1].image}
                    alt=""
                    className="aspect-[4/5] w-full object-cover"
                  />

                ) : (

                  <div className="flex aspect-[4/5] items-center justify-center bg-white text-6xl">
                    📘
                  </div>

                )}

              </motion.div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">

          {[
            ["10K+", "Books"],
            ["50+", "Categories"],
            ["25K+", "Readers"],
            ["4.9", "Average Rating"],
          ].map(([number, label], index) => (

            <motion.div
              key={label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="px-4 py-8 text-center"
            >

              <div className="text-2xl font-black text-indigo-600 sm:text-3xl">
                {number}
              </div>

              <div className="mt-1 text-xs text-slate-500 sm:text-sm">
                {label}
              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* =====================================================
          WHY BOOKVERSE
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            Why BookVerse?
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            More than just a bookstore
          </h2>

          <p className="mt-3 text-slate-500">
            Everything you need to discover your next great read.
          </p>

        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              icon: "📚",
              title: "Curated Books",
              text: "Discover books selected for curious minds.",
            },
            {
              icon: "🔍",
              title: "Easy Discovery",
              text: "Find exactly what you're looking for.",
            },
            {
              icon: "❤️",
              title: "Save Favorites",
              text: "Keep your favorite books close.",
            },
            {
              icon: "🔒",
              title: "Secure Shopping",
              text: "A simple and secure experience.",
            },
          ].map((feature) => (

            <motion.div
              key={feature.title}
              whileHover={{
                y: -6,
              }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
            >

              <div className="text-4xl">
                {feature.icon}
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.text}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-8 text-center shadow-xl sm:p-14">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >

            <div className="text-5xl">
              🚀
            </div>

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Your next favorite book is waiting.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              Explore thousands of books and start your next
              learning adventure today.
            </p>

            <Link
              to="/books"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              Start Exploring →
            </Link>

          </motion.div>

        </div>

      </section>

    </div>
  );
};

export default Homepage;