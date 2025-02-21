const fs = require("fs");
const http = require("http");

const index = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");

const server = http.createServer((req, res) => {
  if (req.url === "/meu-teste" || req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(index);
  } else {
    res.end("There are no routes for that endpoint");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("localhost:8000");
});
