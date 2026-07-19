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

  // fetch Product
  const fetchApi = () => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data)
        console.log(data)
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
      <nav className="bg-blue-800 p-4 flex justify-between">
        <a href="http://" className="text-white font-medium text-xl">Shopping</a>
        <a href="http://" className="text-white font-medium text-xl">Ecommerce website</a>
      </nav>
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
                <button className="bg-violet-700 rounded text-white font-medium p-1">Submit</button>
            }
          </form>
        </div>

        <div className="flex-1 border-2 rounded-lg p-5 border-gray-300 grid grid-cols-3 gap-5">
          {
            fetchData.map((item, index) => (
              <div key={index} className="border-2  rounded-lg border-gray-300">
                <img className="rounded-lg w-2xl" src={item.image} alt="img" />
                <div className="p-3">
                  <h1>{item.title}</h1>
                  <p>{item.description.slice(0, 20)}</p>
                  <div className="space-x-3">
                    <span>₹{(item.price - (item.price * item.discount) / 100).toFixed(1)}</span>
                    <del>₹{item.price}</del>
                    <span>({item.discount}% off)</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-green-700 text-white font-semibold px-3 py-1 mt-3 rounded">Buy Now</button>
                    <button onClick={() => deleteProduct(item.id)} className="bg-red-700 text-white font-semibold px-3 py-1 rounded">Delete</button>
                    <button onClick={() => updateProduct(item)} className="bg-yellow-700 text-white font-semibold px-3 py-1 rounded">Update</button>
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