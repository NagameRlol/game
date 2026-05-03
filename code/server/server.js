const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let players = {};

wss.on("connection", (ws) => {
  const id = Math.random().toString(36).slice(2);

  players[id] = { x: 0, y: 0 };
  console.log("Player connected:", id);

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    players[id] = data;

    const state = JSON.stringify(players);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(state);
      }
    });
  });

  ws.on("close", () => {
    delete players[id];
    console.log("Player disconnected:", id);
  });
});

// IMPORTANT: bind to 0.0.0.0 for Codespaces
server.listen(3000, "0.0.0.0", () => {
  console.log("WebSocket server running on port 3000");
});