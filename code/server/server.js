const WebSocket = require("ws");

const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });

let players = {};

wss.on("connection", (ws) => {
  const id = Math.random().toString(36).slice(2);

  players[id] = { x: 0, y: 0 };
  console.log("Player connected:", id);

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // update player
    players[id] = data;

    // broadcast state
    const state = JSON.stringify(players);
    wss.clients.forEach(client => {
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

console.log("WebSocket server running on port", PORT);