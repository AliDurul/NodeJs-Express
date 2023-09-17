"use strict";
/*-------------------------------------

//? HTTP

-------------------------------------*/

const http = require("node:http");

const app = http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.statusCode = 400;
      res.statusMessage = "not found";

      res.setHeader("Content-type", "text/html");
      res.setHeader("another-type", "another/value");

      res.write("* satir 1");
      res.end("Main Page");
    } else if (req.url === "/second") {
      if (req.method == "GET") {
        res.writeHead(200, {
            'Content-Type':'text/html'
        })
        res.end("GET");
      } else {
          res.writeHead(404, 'HATALI ISTEK')
        res.end("not supported req");
      }
    } else {
      res.end("Ops ! Page not found");
    }
  })
  .listen(5000, () => {
    console.log("server is running at http://127.0.0.1:5000");
  });

/* -------------------------------------*/

/* -------------------------------------*/
