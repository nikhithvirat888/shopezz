import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const addToCart = (p) => setCart([...cart, p]);

  const remove = (i) => {
    const temp = [...cart];
    temp.splice(i, 1);
    setCart(temp);
  };

  const total = cart.reduce((a, b) => a + b.price, 0);

  const placeOrder = async () => {
    await axios.post("http://localhost:5000/api/orders", {
      user,
      items: cart,
      address,
      total,
    });

    alert("Order Placed!");
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  if (!user) return <Login onLogin={login} />;

  return (
    <div>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", background: "#2874f0", color: "white", padding: 10 }}>
        <h2>SHOPEZ</h2>

        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Fashion">Fashion</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Watches">Watches</option>
          <option value="Laptops">Laptops</option>
          <option value="Gaming">Gaming</option>
        </select>

        <button onClick={() => setShowCart(!showCart)}>Cart ({cart.length})</button>
        <button onClick={logout}>Logout</button>
      </div>

      {/* CART */}
      {showCart ? (
        <div>
          <h2>Cart</h2>

          {cart.map((c, i) => (
            <div key={i}>
              <h3>{c.name}</h3>
              <button onClick={() => remove(i)}>Remove</button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          {cart.length > 0 && (
            <button onClick={() => setShowCheckout(true)}>
              Buy Now
            </button>
          )}
        </div>
      ) : showCheckout ? (

        /* CHECKOUT */
        <div>
          <h2>Checkout</h2>

          <input placeholder="Name" onChange={(e) => setAddress({ ...address, name: e.target.value })} />
          <input placeholder="Mobile" onChange={(e) => setAddress({ ...address, mobile: e.target.value })} />
          <input placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <textarea placeholder="Address" onChange={(e) => setAddress({ ...address, address: e.target.value })} />

          <h3>Total: ₹{total}</h3>

          <button onClick={placeOrder}>Place Order</button>
        </div>

      ) : (

        /* PRODUCTS */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {products
            .filter(p => category === "All" ? true : p.category === category)
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            .map(p => (
              <div key={p._id}>
                <img src={p.image} width="100%" height="150" />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            ))}
        </div>
      )}

    </div>
  );
}

export default App;