```jsx
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const login = () => {
    const email = prompt("Enter Email");
    const password = prompt("Enter Password");

    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
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

  const addToCart = (item) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const buyNow = (item) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const address = prompt("Enter Delivery Address");

    if (!address) {
      alert("Address is required");
      return;
    }

    alert("Order Placed Successfully!");
  };

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <div
        style={{
          background: "#2874f0",
          color: "white",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>SHOPEZ 🛒</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            style={{
              padding: "8px 15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cart ({cart.length})
          </button>

          {user ? (
            <button
              onClick={logout}
              style={{
                padding: "8px 15px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              style={{
                padding: "8px 15px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "15px",
              width: "250px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />

            <h3>{p.name}</h3>

            <p
              style={{
                color: "#2874f0",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ₹{p.price}
            </p>

            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#2874f0",
                color: "white",
                border: "none",
                padding: "10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => buyNow(p)}
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div
        style={{
          background: "white",
          margin: "20px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>🛒 Shopping Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>
                {item.name} - ₹{item.price}
              </span>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
```
