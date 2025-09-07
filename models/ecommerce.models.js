const mongoose = require("mongoose");

// ---------------- Product Schema ----------------
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: [{ type: String }],

  price: { type: Number, required: true }, 
  originalPrice: { type: Number, required: true },
  discountPercent: { type: Number },

  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },

  category: { type: String, required: true },
  sizes: [{ type: String }],

  images: [{ type: String }],
  features: [{ type: String }],

  deliveryInfo: {
    returnPolicy: { type: String },
    payOnDelivery: { type: Boolean, default: true },
    freeDelivery: { type: Boolean, default: true },
    securePayment: { type: Boolean, default: true }
  },

  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

//--------------------- Wishlist Schema ----------------------------------
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Product, Wishlist };
