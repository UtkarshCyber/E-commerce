const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Product = require("./models/Product");

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("MongoDB Error", err));

// Load and parse Excel file
const workbook = xlsx.readFile("product2.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const products = xlsx.utils.sheet_to_json(sheet);

// Insert into MongoDB
Product.insertMany(products)
  .then(() => {
    console.log("✅ Products inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Insert failed:", err);
    mongoose.connection.close();
  });
