"use strict";
/*-------------------------------------

NODEJS

-------------------------------------*/

const http = require("node:http");

const app = http.createServer((req, res) => {
  res.end("welcome to nodejs");
});

app.listen(8000, () => {
  console.log('server is running at http://127.0.0.1:8000');
})


/* -------------------------------------*/
