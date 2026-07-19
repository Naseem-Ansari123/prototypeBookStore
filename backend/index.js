const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 8080

const DB_FILE = path.join(__dirname, "products.json")

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2))
}

const readProducts = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8")
    return JSON.parse(data)
  }

  catch {
    return []
  }
}

const writeProducts = (products) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2))
}

const validateProduct = (body) => {
  const {
    title,
    description,
    price,
    discount,
    category,
    image
  } = body

  if (!title?.trim())
    return "Title is required"

  if (!description?.trim())
    return "Description is required"

  // if (price === undefined || typeof price !== "number" || price < 0)
  //   return "Price must be positive number"

  // if (
  //   discount === undefined ||
  //   typeof discount !== "number" ||
  //   discount < 0 ||
  //   discount > 100
  // )
  //   return "Discount must be between 0 and 100"

  if (!category?.trim())
    return "Category is required"

  if (!image?.trim())
    return "Image is required"

  return null
}

app.get("/products", (req, res) => {
  const products = readProducts()

  res.json(products)
})

app.get("/products/:id", (req, res) => {
  const products = readProducts()

  const product = products.find(
    item => item.id === Number(req.params.id)
  )

  if (!product)
    return res.status(404).json({
      message: "Product not found"
    })

  res.json(product)
})

app.post("/products", (req, res) => {
  const error = validateProduct(req.body)

  if (error)
    return res.status(400).json({
      message: error
    })

  const products = readProducts()

  const newId =
    products.length > 0
      ? Math.max(...products.map(item => item.id)) + 1
      : 1

  const newProduct = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    category: req.body.category,
    image: req.body.image
  }

  products.push(newProduct)

  writeProducts(products)

  res.status(201).json(newProduct)
})

app.put("/products/:id", (req, res) => {
  const error = validateProduct(req.body)

  if (error)
    return res.status(400).json({
      message: error
    })

  const products = readProducts()

  const index = products.findIndex(
    item => item.id === Number(req.params.id)
  )

  if (index === -1)
    return res.status(404).json({
      message: "Product not found"
    })

  products[index] = {
    id: products[index].id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    category: req.body.category,
    image: req.body.image
  }

  writeProducts(products)

  res.json(products[index])
})

app.delete("/products/:id", (req, res) => {
  const products = readProducts()

  const index = products.findIndex(
    item => item.id === Number(req.params.id)
  )

  if (index === -1)
    return res.status(404).json({
      message: "Product not found"
    })

  const deletedProduct = products[index]

  products.splice(index, 1)

  writeProducts(products)

  res.json(deletedProduct)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})