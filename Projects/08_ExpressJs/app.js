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


/* app.get("/user/:userid(\\d+)-:username", (req, res) => {
  res.send({
    paramas: req.params,
  });
}); */


/* Response Methods */

//? SendStatus:
// app.get('/', (req, res) => res.sendStatus(200))
//? Status:
// app.get('/', (req, res) => res.status(200).send({ message: 'OK' }))
// app.post('/', (req, res) => res.status(201).send({ message: 'Created' }))
// app.put('/', (req, res) => res.status(202).send({ message: 'Accepted' }))
// app.delete('/', (req, res) => res.status(204).send({ message: 'No Content' }))
//? JSON (.send() method already does this converting.)
// app.get('/', (req, res) => res.json([{ key: 'value' }]))
//? Download File (Download at browser):
// app.get('/download', (req, res) => res.download('index.js', 'changedName.js'))
//? SendFile Content:
// app.get('/file', (req, res) => res.sendFile(__dirname + '/index.js')) // FilePath must be realPath
//? Redirect:
// app.get('/google', (req, res) => res.redirect(302, 'https://www.google.com'))

app.listen(PORT, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});
