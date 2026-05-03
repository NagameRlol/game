const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("CLIENT CONNECTED");
  ws.send(
    {
      dodoo: "doo doo",
    }
  );
});

server.listen(3000, "0.0.0.0", () => {
  console.log("LISTENING ON 3000");
});

function create_entity(id, name, color, x, y, vx, vy, size, controllable) {
    let e = new Entity;
    e.id = id;
    e.name = name;
    e.color = color;
    e.x = x;
    e.y = y;
    e.vx = vx;
    e.vy = vy;
    e.size = size;
    e.controllable = controllable;
    entities.push(e);
}