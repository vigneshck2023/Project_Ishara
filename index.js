const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const { initializeDatabase } = require("./db/db.connect");
const { Product, Wishlist } = require("./models/ecommerce.models");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// Initialize Database
initializeDatabase();

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: { products } });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

// Create new product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
});

// Get single product by ID
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Error fetching the product:", error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

// Wishlist Routes
app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.status(200).json({ data: wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

app.post("/api/wishlist", async (req, res) => {
  try {
    const newWishlistItem = new Wishlist(req.body);
    const savedWishlistItem = await newWishlistItem.save();
    res
      .status(201)
      .json({ message: "Item added to wishlist", data: savedWishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Failed to add item to wishlist" });
  }
});

app.delete("/api/wishlist/:id", async (req, res) => {
  try {
    const deletedItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    res.status(500).json({ error: "Failed to remove item from wishlist" });
  }
});

// Category Routes
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ data: { categories } });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
});

// Get products by category name
app.get("/api/categories/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Find products in this category
    const products = await Product.find({ category: categoryName });

    if (!products.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      data: {
        category: {
          name: categoryName,
          products
        }
      }
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Failed to fetch category", error });
  }
});


// Start Server
module.exports = app;
