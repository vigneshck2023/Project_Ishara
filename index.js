const express = require("express");
const cors = require("cors");
const app = express();

const {initializeDatabase} = require("./db/db.connect");
const { Product, Wishlist } = require("./models/ecommerce.models");

app.use(cors());
app.use(express.json());
app.use(cors({origin: "*", credentials: true, optionsSuccessStatus: 200}));

// Initializing DB
initializeDatabase();

app.get("/", (req,res) => {
    res.send("Hello from Express Server");
})

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: { products } });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", data: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})