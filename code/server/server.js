const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();

const wss = new WebSocket.Server({
  server,
  path: "/ws"   // IMPORTANT FIX
});

let players = {};

wss.on("connection", (ws) => {
  console.log("CONNECTED");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    ws.send(JSON.stringify({ ok: true }));
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 3000");
});