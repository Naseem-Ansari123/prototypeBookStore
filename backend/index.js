const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const app = express()
const { MongoClient } = require('mongodb');
const { error } = require("console")
const userRoutes = require("./routes/userRoutes");
const { dbConnection } = require("./config/db");

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on:http://localhost:${PORT}`);
        });
    })
    .catch(console.error);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/users", userRoutes);


const PORT = 8080



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

const readProducts = async () => {
  try {
    const db = await dbConnection()
    const dataCollection = db.collection("data")
    const newData = await dataCollection.find({}).toArray();
    console.log(typeof newData);

    return newData;
  }

  catch {
    return []
  }
}
app.get("/products", async (req, res) => {
  const products = await readProducts();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const products = await readProducts()

  const product = products.find(
    item => item.id === Number(req.params.id)
  )

  if (!product)
    return res.status(404).json({
      message: "Product not found"
    })

  res.json(product)
})

app.post("/products", async (req, res) => {
  const error = validateProduct(req.body)

  if (error)
    return res.status(400).json({
      message: error
    })

  const products = await readProducts()

  const newProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    category: req.body.category,
    image: req.body.image
  }
  const db = await dbConnection()
  const dataCollection = db.collection("data")
  dataCollection.insertOne(newProduct)

  res.status(201).json(newProduct)
})

app.put("/products/:id", async (req, res) => {
  const error = validateProduct(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }
  const db = await dbConnection()
  const dataCollection = db.collection("data");

  const result = await dataCollection.updateOne(
    { id: Number(req.params.id) },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        image: req.body.image
      }
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product updated successfully"
  });
})

app.delete("/products/:id", async (req, res) => {
  const db = await dbConnection();

  const dataCollection = db.collection("data");

  const result = await dataCollection.deleteOne({
    id: Number(req.params.id),
  });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product deleted successfully",
  });
});
