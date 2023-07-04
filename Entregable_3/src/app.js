const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

const ProductManager = require("./ProductManager");
const manager = new ProductManager("./src/products.json");

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.readProducts();
  const limitProducts = products.slice(0, limit);
  limit ? res.send(limitProducts) : res.send(products);
});

app.get("/products/:pid", async (req, res) => {
  const idProduct = await manager.getProductById(
    Number.parseInt(req.params.pid)
  );
  res.send(idProduct);
});

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT} ✔`);
});
