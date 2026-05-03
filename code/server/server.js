const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});

wss.on("connection", (ws) => {
  console.log("CONNECTED");
  ws.send(JSON.stringify({ hello: "world" }));
});