import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Homepage = () => {
  const api = "http://localhost:8080/products"
  const [fetchData, setFetchData] = useState([])
  const [count, setCount] = useState(0)

  /* ---------------- Categories ---------------- */

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


  const fetchApi = () => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data)
        console.log(data)
      })
  }
  useEffect(() => {
    fetchApi()
  }, [count])
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">

        {/* Background Effects */}

        <div className="absolute inset-0">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.25),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.3),transparent_35%)]" />

          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-3xl" />

          {/* Decorative Books */}

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

        {/* Hero Content */}

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                ✨ Knowledge starts here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Discover books that

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                expand your universe.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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

            {/* Fake Search UI */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-8 max-w-2xl"
            >
              <div className="group flex items-center rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/15">

                <span className="text-xl">
                  🔍
                </span>

                <span className="ml-4 flex-1 text-sm text-slate-400 sm:text-base">
                  Search books, authors, categories...
                </span>

                <span className="hidden rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-400 sm:block">
                  ⌘ K
                </span>

              </div>
            </motion.div>

            {/* Hero Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
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
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore Categories
              </button>

            </motion.div>

          </div>

        </div>

        {/* Bottom Gradient */}

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
            Explore our collection based on what you love.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {categories.map((category, index) => (

            <motion.div
              key={category.name}
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
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-300 hover:shadow-xl"
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

              <div className="mt-3 text-xs font-semibold text-cyan-600 opacity-0 transition group-hover:opacity-100">
                Explore →
              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          TRENDING BOOKS HEADER
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="text-xl">
                🔥
              </span>

              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Trending now
              </p>

            </div>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Books worth discovering
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Hand-picked books for curious minds.
            </p>

          </div>

          <Link
            to="/books"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            View all books →
          </Link>

        </div>

      </section>


      {/* =====================================================
          YOUR EXISTING BOOK CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {fetchData.slice(0, 10).map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, }}
              exit={{ opacity: 0, y: -80, scale: 0.9, }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut", }}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Discount */}

                <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-[9px] font-bold text-white">
                  {item.discount}% OFF
                </span>

                {/* Fake Wishlist */}

                <button
                  className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-pink-500 shadow-md backdrop-blur transition hover:scale-110 hover:bg-pink-500 hover:text-white"
                >
                  ♡
                </button>

              </div>

              {/* Content */}

              <div className="p-3">

                <span className="inline-block max-w-full truncate rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-medium text-indigo-600">
                  {item.category}
                </span>

                <h3 className="mt-2 line-clamp-1 text-sm font-bold text-slate-800">
                  {item.title}
                </h3>

                <div className="mt-2 flex items-center gap-2">

                  <span className="text-base font-bold text-indigo-600">
                    ₹
                    {(
                      item.price -
                      (item.price * item.discount) / 100
                    ).toFixed(0)}
                  </span>

                  <del className="text-[10px] text-slate-400">
                    ₹{item.price}
                  </del>

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

              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          INTERACTIVE BOOK DISCOVERY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">

          {/* Glow */}

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">

            {/* Left */}

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

              {/* Fake Interests */}

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
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {item}
                  </button>

                ))}

              </div>

              <button
                className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Find My Book →
              </button>

            </div>

            {/* Right Floating Books */}

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


export default Homepage
