<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2874f0",
    color: "white",
    padding: "15px 30px"
  }}
>
  <h2>SHOPEZ 🛒</h2>

  <div style={{ display: "flex", gap: "15px" }}>
    <button>Cart ({cart.length})</button>
    <button onClick={logout}>Logout</button>
  </div>
</div>