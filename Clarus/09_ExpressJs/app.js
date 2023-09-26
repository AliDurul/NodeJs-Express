const express = require("express");
const app = express();

/* env */
require("dotenv").config();

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "//localhost";

/* app.get("/", (req, res) => {
  //   res.send("ali durul");
  res.send({ mss: "called by get methods" });
});

app.post("/", (request, response) =>
  response.send({ message: "called in 'post' method." })
);
app.put("/", (request, response) =>
  response.send({ message: "called in 'put' method." })
);
app.delete("/", (request, response) =>
  response.send({ message: "called in 'delete' method." })
);

app.all('/',(req,res) => {
    response.send({ message: "All methods." })
}) */

//? app.route
app.route('/')
.get((req,res) => { res.send('get')})
.post((req,res) => { res.send('post')})
.put((req,res) => { res.send('put')})
.delete((req,res) => { res.send('delete')})


app.listen(PORT, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});
