const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { dbConnection } = require("./config/db");
const { ObjectId } = require("mongodb");
const { requireAdmin } = require("./middleware/auth");
const { adminSchema } = require("./schema/admin");

const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/orders", orderRoutes);

// Connect DB and start server
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`);
    });
  })
  .catch(console.error);


// ===============================
// PRODUCT VALIDATION
// ===============================

const validateProduct = (body) => {
  const {
    title,
    description,
    category,
    image,
    quantity
  } = body;

  if (!title?.trim())
    return "Title is required";

  if (!description?.trim())
    return "Description is required";

  if (!category?.trim())
    return "Category is required";

  if (!image?.trim())
    return "Image is required";

  // Quantity validation
  if (
    quantity !== undefined &&
    (
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 0
    )
  ) {
    return "Quantity must be a whole number greater than or equal to 0";
  }

  return null;
};


// ===============================
// READ PRODUCTS
// ===============================

const readProducts = async () => {
  try {
    const db = await dbConnection();
    const dataCollection = db.collection("data");

    const newData = await dataCollection.find({}).toArray();
    const adminIds = [...new Set(newData.map((p) => p.admin_id).filter(Boolean))];
    const stores = {};
    if (adminIds.length) {
      const admins = await adminSchema.find({
        _id: { $in: adminIds.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id)) }
      }).select("storeName address city state pincode logoUri").lean();
      admins.forEach((a) => {
        stores[a._id.toString()] = {
          storeName: a.storeName,
          address: a.address,
          city: a.city,
          state: a.state,
          pincode: a.pincode,
          logoUri: a.logoUri || ""
        };
      });
    }
    return newData.map((p) => ({
      ...p,
      store: stores[String(p.admin_id)] || null
    }));
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
};


// ===============================
// GET ALL PRODUCTS
// ===============================

app.get("/products", async (req, res) => {
  try {
    const products = await readProducts();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});


// ===============================
// CREATE PRODUCT
// ===============================

app.post("/products", requireAdmin, async (req, res) => {
  try {
    const validationError = validateProduct(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      image: req.body.image,
      author: req.body.author || "",
      admin_id: req.auth.id,
      storeId: req.auth.id,

      // NEW
      quantity:
        req.body.quantity !== undefined
          ? Number(req.body.quantity)
          : 1
    };

    const db = await dbConnection();
    const dataCollection = db.collection("data");

    const result = await dataCollection.insertOne(newProduct);

    // Return inserted product with MongoDB ID
    const createdProduct = {
      _id: result.insertedId,
      ...newProduct
    };

    res.status(201).json(createdProduct);

  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
});


// ===============================
// UPDATE COMPLETE PRODUCT
// ===============================

app.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const validationError = validateProduct(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const db = await dbConnection();
    const dataCollection = db.collection("data");

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      image: req.body.image,
      author: req.body.author || ""
    };

    // Only update quantity if it is provided
    if (req.body.quantity !== undefined) {
      updateData.quantity = Number(req.body.quantity);
    }

    const result = await dataCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
        admin_id: req.auth.id
      },
      {
        $set: updateData
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Get updated product
    const updatedProduct = await dataCollection.findOne({
      _id: new ObjectId(req.params.id),
      admin_id: req.auth.id
    });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
});


// ===============================
// UPDATE ONLY QUANTITY
// ===============================

app.patch("/products/:id/quantity", requireAdmin, async (req, res) => {
  try {
    const { change } = req.body;

    // Validate product ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    // Validate change
    if (
      change === undefined ||
      !Number.isInteger(Number(change))
    ) {
      return res.status(400).json({
        message: "Change must be a whole number"
      });
    }

    const quantityChange = Number(change);

    const db = await dbConnection();
    const dataCollection = db.collection("data");

    // First get current product
    const product = await dataCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const currentQuantity = Number(product.quantity || 0);

    const newQuantity = currentQuantity + quantityChange;

    // Don't allow negative stock
    if (newQuantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be less than 0",
        quantity: currentQuantity
      });
    }

    // Update quantity
    const result = await dataCollection.updateOne(
      {
        _id: new ObjectId(req.params.id)
      },
      {
        $set: {
          quantity: newQuantity
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        message: "Quantity was not updated"
      });
    }

    res.json({
      message:
        quantityChange > 0
          ? "Quantity increased successfully"
          : "Quantity decreased successfully",

      quantity: newQuantity
    });

  } catch (error) {
    console.error("Quantity update error:", error);

    res.status(500).json({
      message: "Failed to update quantity",
      error: error.message
    });
  }
});


// ===============================
// DELETE PRODUCT
// ===============================

app.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const db = await dbConnection();
    const dataCollection = db.collection("data");

    const result = await dataCollection.deleteOne({
      _id: new ObjectId(req.params.id),
      admin_id: req.auth.id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});