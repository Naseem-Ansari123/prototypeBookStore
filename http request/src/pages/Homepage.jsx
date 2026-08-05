import React from 'react'
import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
const Homepage = () => {
  const api = "http://localhost:8080/products"
  const [fetchData, setFetchData] = useState([])
  const [count, setCount] = useState(0)

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
    <div className="flex-1 border border-gray-200 rounded-3xl p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {fetchData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -80,
            scale: 0.9,
          }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            ease: "easeOut",
          }}
          className="group max-w-[280px] w-full mx-auto overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
        >

          {/* Image */}
          <div className="overflow-hidden relative">
            <img
              src={item.image}
              alt={item.title}
              className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {item.discount}% OFF
            </span>
          </div>

          {/* Content */}
          <div className="p-4">

            <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition">
              {item.title}
            </h2>

            <p className="text-gray-500 mt-2 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Price */}
            <div className="text-2xl font-bold text-indigo-600">

              <span className="text-3xl font-bold text-indigo-600">
                ₹{(item.price - (item.price * item.discount) / 100).toFixed(0)}
              </span>

              <del className="text-gray-400">
                ₹{item.price}
              </del>

            </div>

            {/* Category */}
            <div className="text-xs px-3 py-1">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                {item.category}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

              <button className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 text-sm font-medium hover:scale-105 transition">
                🛒 Buy Now
              </button>

              <button className="rounded-lg bg-pink-100 text-pink-600 px-3 hover:bg-pink-500 hover:text-white hover:scale-110 transition">
                ❤️
              </button>

              <button className="rounded-lg bg-blue-100 text-blue-600 px-3 hover:bg-blue-500 hover:text-white hover:scale-110 transition">
                👁️
              </button>

            </div>

          </div>

        </motion.div>
      ))}
    </div>

  )
}

export default Homepage
