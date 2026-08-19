import React from 'react'
import { useState, useEffect } from "react"

const Admin = () => {
    const api = "http://localhost:8080/products"

    var modal = {
        title: "",
        price: "",
        discount: "",
        category: "",
        image: "",
        description: ""
    }
    const [count, setCount] = useState(0)
    const [product, setProduct] = useState(modal)
    const [fetchData, setFetchData] = useState([])
    const [id, setId] = useState(null)

    // set Product
    const handleChange = (e) => {
        var val = e.target.value
        var name = e.target.name
        setProduct({
            ...product,
            [name]: val
        })
    }

    // create/add Product
    const createProducts = (e) => {
        e.preventDefault();
        fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then((res) => res.json())
            .then((data) => {
                setProduct(modal)
                setCount(count + 1);
                toast("Product created Sucessfully!")
                console.log(data);
            })
    }


    // delete Product
    const deleteProduct = (id) => {
        var apiUrl = `${api}/${id}`
        fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then((res) => res.json())
            .then((data) => {
                setCount(count + 1);
                toast("Product deleted Sucessfully!")
                console.log(data);

            })
    }

    const updateProduct = (e) => {
        e.preventDefault();
        var apiUrl = `${api}/${product._id}`
        fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then((res) => res.json())
            .then((data) => {
                setCount(count + 1)
                setProduct(modal)
                setId(null);
                console.log(data)
                toast(data.message)
            })
    }

    const reflectChangesToInput = (item) => {
        setId(1);
        setProduct(item);
    }

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
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 shadow-xl">

                    {/* Decorative circles */}
                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-cyan-300/10 blur-2xl"></div>

                    <div className="relative max-w-3xl">
                        <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                            📚 Science & Technology
                        </span>

                        <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            Explore Science & Technology Books
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                            Learn AI, Programming, Physics, Mathematics and Engineering
                            from the world's best authors.
                        </p>

                        <button className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl active:scale-95">
                            Browse Collection
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">

                    {/* Add Product Form */}
                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">

                        <div className="mb-6">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Product Management
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {id ? "Edit Product" : "Add Product"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {id
                                    ? "Update the selected book details."
                                    : "Add a new book to your collection."}
                            </p>
                        </div>

                        <form
                            onSubmit={id ? updateProduct : createProducts}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Title
                                </label>

                                <input
                                    onChange={handleChange}
                                    value={product.title}
                                    name="title"
                                    type="text"
                                    placeholder="Enter book title"
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Price
                                    </label>

                                    <input
                                        onChange={handleChange}
                                        value={product.price}
                                        name="price"
                                        type="number"
                                        placeholder="₹ Price"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Discount
                                    </label>

                                    <input
                                        onChange={handleChange}
                                        value={product.discount}
                                        name="discount"
                                        type="number"
                                        placeholder="%"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Category
                                </label>

                                <input
                                    onChange={handleChange}
                                    value={product.category}
                                    name="category"
                                    type="text"
                                    placeholder="e.g. Science"
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Image URL
                                </label>

                                <input
                                    onChange={handleChange}
                                    value={product.image}
                                    name="image"
                                    type="text"
                                    placeholder="https://..."
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    onChange={handleChange}
                                    value={product.description}
                                    name="description"
                                    placeholder="Enter book description"
                                    rows="4"
                                    className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    required
                                ></textarea>
                            </div>

                            {id ? (
                                <button className="mt-2 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg active:scale-95">
                                    Update Product
                                </button>
                            ) : (
                                <button className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg active:scale-95">
                                    Add Product
                                </button>
                            )}
                        </form>
                    </aside>

                    {/* Products Section */}
                    <section className="min-w-0">
                        {/* Section Header */}
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                    Collection
                                </p>

                                <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                    Available Books
                                </h2>
                            </div>

                            <span className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                                {fetchData.length} Books
                            </span>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {fetchData.map((item, index) => (
                                <article
                                    key={index}
                                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Book Image */}
                                    <div className="relative overflow-hidden bg-slate-100">
                                        <img
                                            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                                            src={item.image}
                                            alt={item.title}
                                        />

                                        {/* Discount */}
                                        <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-[10px] font-bold text-white">
                                            {item.discount}% OFF
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3">
                                        {/* Category */}
                                        <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-medium text-indigo-600">
                                            {item.category}
                                        </span>

                                        {/* Title */}
                                        <h2 className="mt-2 line-clamp-1 text-sm font-bold text-slate-800 sm:text-base">
                                            {item.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                                            {item.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-base font-bold text-indigo-700 sm:text-lg">
                                                ₹
                                                {(
                                                    item.price -
                                                    (item.price * item.discount) / 100
                                                ).toFixed(1)}
                                            </span>

                                            <del className="text-xs text-slate-400">
                                                ₹{item.price}
                                            </del>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-3 flex gap-1.5">
                                            <button className="flex-1 rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700">
                                                Buy
                                            </button>

                                            <button
                                                onClick={() => reflectChangesToInput(item)}
                                                className="rounded-lg bg-yellow-100 px-2.5 text-sm text-yellow-700 transition hover:bg-yellow-200"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                onClick={() => deleteProduct(item._id)}
                                                className="rounded-lg bg-red-100 px-2.5 text-sm text-red-600 transition hover:bg-red-200"
                                                title="Delete"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Admin
