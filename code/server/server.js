const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("CLIENT CONNECTED");
  ws.send("hello");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("LISTENING ON 3000");
});