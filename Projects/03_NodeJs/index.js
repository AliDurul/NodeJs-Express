"use strict";
/*-------------------------------------

//? HTTP

-------------------------------------*

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
        res.writeHead(200,'islem basairli' ,{
            'Content-Type':'text/html'
        })

        const obj = {
            result:true,
            message:'islem basarili'
        }

        res.end(JSON.stringify(obj));
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

//! env

const http = require("node:http");
require("dotenv").config()

const PORT = process.env.PORT ?? 8000

http
  .createServer((req, res) => {
    res.end("<h1> welcome nodejs server");
  })
  .listen(PORT, () =>
    console.log(`server is running at http://127.0.0.1:${PORT}`)
  );

/* -------------------------------------*/
