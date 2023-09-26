const express = require("express");
const app = express();

/* env */
require("dotenv").config();

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "//localhost";

app.get("/", (req, res) => {
  res.send("ali durul");
});

app.listen(PORT, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});
