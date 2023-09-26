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
/* app.route('/')
.get((req,res) => { res.send('get')})
.post((req,res) => { res.send('post')})
.put((req,res) => { res.send('put')})
.delete((req,res) => { res.send('delete')}) */

//? url parameters
/* app.get("/user/:userId/config/:configParam/*", (req, res) => {
  res.send({
    url: {
      protocol: req.protocol,
      subdomains: req.subdomains,
      hostname: req.hostname,
      baseUrl: req.baseUrl,
      params: req.params,
      query: req.query,
      path: req.path,
      originalUrls: req.originalUrl,
    },
  });
}); */

//?format zorlama
/* app.get("/user/:userid(\\d+)", (req, res) => {
  res.send({
    paramas: req.params,
  });
}); */


app.get("/user/:userid(\\d+)-:username", (req, res) => {
  res.send({
    paramas: req.params,
  });
});

app.listen(PORT, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});
