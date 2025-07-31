const Product = require("../models/Product");
const mongoose = require("mongoose");

// @desc Get all products
// @route GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc Get a product by ID
// @route GET /api/products/:id
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  // Check if it's a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
