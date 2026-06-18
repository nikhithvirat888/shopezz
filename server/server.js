const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("🔥 SHOPEZ SERVER STARTING...");
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* ---------------- ROOT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("SHOPEZ Backend Running 🚀");
});

/* ---------------- PRODUCTS API ---------------- */
app.get("/api/products", (req, res) => {
  console.log("✅ PRODUCTS API HIT");

  res.json([
    {
      _id: "1",
      name: "iPhone 15",
      price: 79999,
      category: "Mobiles",
      image:"https://media.idownloadblog.com/wp-content/uploads/2023/09/iPhone-15-regular-and-pro.jpg "
    },
    {
      _id: "2",
      name: "Samsung S24",
      price: 69999,
      category: "Mobiles",
      image:"https://tse1.mm.bing.net/th/id/OIP.fkNyKs9n3B9uPdXVj6NWtQHaE8?pid=Api&P=0&h=180"
    },
    {
      _id: "3",
      name: "OnePlus 12",
      price: 64999,
      category: "Mobiles",
      image: "https://tse4.mm.bing.net/th/id/OIP.Imb4a6AcH7c7HZH_FzvH_QHaHa?pid=Api&P=0&h=180"
    },
    {
      _id: "4",
      name: "AirPods Pro",
      price: 24999,
      category: "Gadgets",
      image:"https://s.yimg.com/os/creatr-uploaded-images/2022-09/e6e611f0-2ed6-11ed-9c5f-9c8fe7f31c59" 
    },
    {
      _id: "5",
      name: "Sony Headphones",
      price: 29999,
      category: "Gadgets",
      image: "https://tse3.mm.bing.net/th/id/OIP.TTJZBbHQD4FyRCWUp2runwHaFj?pid=Api&P=0&h=180"
    },
    {
      _id: "6",
      name: "Casio Watch",
      price: 1999,
      category: "Watches",
      image:"https://tse3.mm.bing.net/th/id/OIP.ft1AZ8p5ace3Gzos0t1nzgHaHa?pid=Api&P=0&h=180" 
    },
{
   _id: "7",
   name: "Women dress",
   price: 1200,
   category: "cloths",
   image:"https://img.kwcdn.com/product/1dab9a690e/63f7126c-f6a3-47ba-9755-705a8865abd3_1340x1786.jpeg.a.jpeg"
},
{
_id: "8",
name: "Men-shirts",
price: 1500,
category: "cloths",
image:"https://tse2.mm.bing.net/th/id/OIP.tAFe101WMxM5fft3UGEM_gHaHa?pid=Api&P=0&h=180"
},
{
_id: "9",
name: "play station",
price:5000,
category: "Games",
image:"https://tse2.mm.bing.net/th/id/OIP.EfAPWI3a78Xx6z5l4YcPtwHaE8?pid=Api&P=0&h=180"
},
{
_id: "10",
name: "jeans",
price:2000,
category:"cloths",
image:"https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/23763896/2023/6/26/f48d6e0d-6cd0-4527-9e18-73cafab85bb51687778492915AAHWANWomenBlueWideLegHigh-RiseJeans1.jpg"
},
  ]);
});

/* ---------------- LOGIN API ---------------- */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "123456") {
    return res.json({
      token: "demo-token",
      user: email
    });
  }

  res.status(400).json({ message: "Invalid credentials" });
});

/* ---------------- ORDERS API ---------------- */
const Order = mongoose.model("Order", {
  user: String,
  items: Array,
  address: Object,
  total: Number,
  date: { type: Date, default: Date.now }
});

app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

app.get("/api/orders/:user", async (req, res) => {
  const orders = await Order.find({ user: req.params.user });
  res.json(orders);
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});