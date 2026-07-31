// day

import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
const api = "http://localhost:8080/products"
const App = () => {
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
    
    const updateProduct = (item) => {
      setId(1);
      setProduct(item);
      var apiUrl = `${api}/${item.id}`
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

      })
  }
  useEffect(() => {
    fetchApi()
  }, [count])
  
  return (
    <div className="min-h-screen bg-gray-400">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">📚 BookVerse</h1>
          <p className="text-gray-500 text-sm"> Science & Technology Library</p>
        </div>

        <div className="flex gap-6">
          <button className="font-semibold hover:text-indigo-600">Home</button>
          <button className="font-semibold hover:text-indigo-600">Books</button>
          <button className="font-semibold hover:text-indigo-600">Categories</button>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white rounded-3xl p-10 my-8 shadow-xl">
        <h1 className="text-5xl font-bold">Explore Science & Technology Books</h1>
        <p className="mt-4 text-lg opacity-90">Learn AI, Programming, Physics, Mathematics and Engineering from the world's best authors.</p>
        <button className="mt-8 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">Browse Collection</button>
      </div>
      <div className="bg-white rounded-lg w-[80%] mx-auto gap-5 mt-13 p-8 flex justify-between">
        <div className="w-[30%] border-2 rounded-lg p-5 border-gray-300">
          <h1 className="text-xl font-medium">Add Products</h1>
          <form onSubmit={createProducts} className="flex flex-col mt-3 space-y-4">
            <input onChange={handleChange} value={product.title} name="title" type="text" placeholder="Title" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required />
            <input onChange={handleChange} value={product.price} name="price" type="number" placeholder="Price" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required />
            <input onChange={handleChange} value={product.discount} name="discount" type="number" placeholder="Discount" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required />
            <input onChange={handleChange} value={product.category} name="category" type="text" placeholder="Category" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required />
            <input onChange={handleChange} value={product.image} name="image" type="text" placeholder="Image" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required />
            <textarea onChange={handleChange} value={product.description} name="description" id="desc" name="description" placeholder="Description" className="border-2 text-lg rounded px-2 py-1 border-gray-300" required></textarea>
            {
              id ?
                <button className="bg-orange-700 rounded text-white font-medium p-1">Edit</button>
                :
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 transition">Submit</button>
            }
          </form>
        </div>

        <div className="flex-1 border-2 rounded-lg p-5 border-gray-300 grid grid-cols-3 gap-5">
          {
            fetchData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                <img className="h-72 w-full object-cover" src={item.image} alt="img" />
                <div className="p-3">

                  <h2 className="font-bold text-xl mt-3">{item.title}</h2>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description.slice(0, 20)}</p>

                  {/* price section */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl font-bold text-indigo-700"> ₹{(item.price - (item.price * item.discount) / 100).toFixed(1)}</span>
                    <del className="text-gray-400">₹{item.price}</del>
                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">({item.discount}% off)</span>
                  </div>

                   {/* category */}
                  <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs">Technology</span>

                  {/* buy,update,delete bun */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">Buy</button>
                    <button onClick={() => updateProduct(item)} className="bg-yellow-500 px-4 rounded-lg hover:bg-yellow-600">✏️</button>
                    <button onClick={() => deleteProduct(item.id)} className="bg-red-500 px-4 rounded-lg hover:bg-red-600">🗑</button>
                  </div>

                </div>
              </div>
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
