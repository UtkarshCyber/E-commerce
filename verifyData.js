const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const sample = await Product.find().limit(5);
  console.log("🧾 Sample Products:\n", sample);
  mongoose.connection.close();
});
