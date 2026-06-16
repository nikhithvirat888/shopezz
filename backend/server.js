const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); // ✅ IMPORTANT (fixes your error)

app.use(cors());
app.use(express.json());

// ---------------- MONGODB ----------------
mongoose
  .connect("mongodb://localhost:27017/shopez")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ---------------- PRODUCTS (20 ITEMS) ----------------
   
app.get("/api/products", (req, res) => {
  res.json([
    { _id: "1", name: "iPhone 15", price: 79999, category: "Mobiles", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tSALwZyC3Q1kzu4szcBcw6Hmd8P1QpcqMi3MOvWc7w&s" },
    { _id: "2", name: "Samsung S24", price: 69999, category: "Mobiles", image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=500" },
    { _id: "3", name: "OnePlus 12", price: 64999, category: "Mobiles", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500" },

    { _id: "4", name: "AirPods Pro", price: 24999, category: "Gadgets", image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500" },
    { _id: "5", name: "Sony Headphones", price: 29999, category: "Gadgets", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },

    { _id: "6", name: "Casio Watch", price: 1999, category: "Watches", image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=500" },

    { _id: "7", name: "Men T-Shirt", price: 799, category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { _id: "8", name: "Women Dress", price: 2499, category: "Fashion", image: "https://imagescdn.pantaloons.com/img/app/product/9/995657-13301207.jpg?auto=format&w=450" },

    
    { _id: "9", name: "PlayStation 5", price: 54990, category: "Gaming", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500" },
     { _id: "10", name: "Men Jeans", price: 1999, category: "Fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { _id: "11", name: "Women Dress", price: 2000, category: "Fashion", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Ali_Liebert_wearing_Momo_at_2012_The_Heart_Truth_celebrity_fashion_show.jpg/960px-Ali_Liebert_wearing_Momo_at_2012_The_Heart_Truth_celebrity_fashion_show.jpg" },

    { _id: "12", name: "MacBook Air", price: 114999, category: "Laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
    { _id: "13", name: "Dell Laptop", price: 50000, category: "Laptops", image:"https://images.pexels.com/photos/9474023/pexels-photo-9474023.jpeg?_gl=1*1edrgl3*_ga*MTY0ODAyNTg5NC4xNzgxNjA3NDI3*_ga_8JE65Q40S6*czE3ODE2MDc0MjckbzEkZzEkdDE3ODE2MDc0NTYkajMxJGwwJGgw" },

  
    { _id: "14", name: "Xbox Series X", price: 52990, category: "Gaming", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500" },
  ]);
}); 

// ---------------- LOGIN ----------------
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "123456") {
    return res.json({
      token: "demo-token",
      user: email,
    });
  }

  res.status(400).json({ message: "Invalid credentials" });
});

// ---------------- ORDERS ----------------
const Order = mongoose.model("Order", {
  user: String,
  items: Array,
  address: Object,
  total: Number,
  date: { type: Date, default: Date.now },
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

// ---------------- START ----------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});