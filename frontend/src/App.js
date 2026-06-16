import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>SHOPEZ</h1>

      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>₹{product.price}</p>
          <p>{product.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;