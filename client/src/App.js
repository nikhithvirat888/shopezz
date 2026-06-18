import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = () => {
    const email = prompt("Enter Email");
    const password = prompt("Enter Password");

    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    })
    .then((res) => {
      setUser(res.data.user);
      alert("Login Successful");
    })
    .catch(() => alert("Invalid Login"));
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  /* ---------------- CART ---------------- */
  const addToCart = (item) => {
    if (!user) return alert("Login first");
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  /* ---------------- BUY NOW (ONLY ONE ACTION) ---------------- */
  const buyNow = (item) => {
    if (!user) return alert("Login first");

    const address = prompt("Enter Delivery Address");

    if (!address) return alert("Address required");

    alert(`Order placed for ${item.name}`);
  };

if (!user) {
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh"
    }}>
      <div style={{
        background:"white",
        padding:"30px",
        borderRadius:"10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.2)"
      }}>
        <h2>SHOPEZ Login</h2>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
  return (
    <div>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        background: "#111",
        color: "white",
        alignItems: "center"
      }}>
        <h2>SHOPEZ 🛒</h2>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <p>Cart: {cart.length}</p>

          {/* LOGIN RIGHT SIDE */}
          {user ? (
            <>
              <p>👤 {user}</p>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px"
      }}>
        {products.map((p, i) => (
          <div key={p._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "220px"
          }}>

            {/* IMAGE */}
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            {/* CART */}
            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>

            {/* ONLY ONE OPTION PER PRODUCT */}
            <button onClick={() => buyNow(p)}>
              Buy Now
            </button>

          </div>
        ))}
      </div>

      {/* CART SECTION */}
      <div style={{ padding: "20px" }}>
        <h2>Cart Items</h2>

        {cart.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "5px"
          }}>
            <p>{item.name} - ₹{item.price}</p>

            <button onClick={() => removeFromCart(i)}>
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;