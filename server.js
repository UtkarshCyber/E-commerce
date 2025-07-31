const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api", productRoutes);

// Global 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
