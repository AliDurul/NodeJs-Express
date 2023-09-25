const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send(`
  <h1> Home Page</h1>
  <a href="/api/products">products</a> <br>
  <a href="/api/products/1">product </a>
  `);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  const singleProduct = products.find((product) => product.id === +productId);
  if (!singleProduct) {
    return res.status(404).send("Product does not exit");
  }
  return res.json(singleProduct);
});

app.listen(5000, () => {
  console.log("this is server runining");
});
