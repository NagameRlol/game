const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

console.log("Server running on ws://localhost:3000");

// Store connected players
const players = new Map();

wss.on('connection', (ws) => {
  console.log("Player connected");

  // Create a player
  const player = {
    x: 0,
    y: 0,
    id: Math.random().toString(36).substr(2, 9)
  };

  players.set(ws, player);

  // Receive messages from client
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Example: movement input
    if (data.type === 'move') {
      player.x += data.dx;
      player.y += data.dy;
    }
  });

  ws.on('close', () => {
    players.delete(ws);
    console.log("Player disconnected");
  });
});