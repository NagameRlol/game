const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("CLIENT CONNECTED");
  ws.send("senddddd", "multipleee", "messagessss");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("LISTENING ON 3000");
});

setInterval(function() {
  update();
}, 2);

let server_entities = [];

function Entity () {
    this.id = -1;
    this.name = "Entity";
    this.color = "#FF0000";
    this.x = 0.0;
    this.y = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.size = 20.0;
    this.controllable = false;
    this.speed = 0.1;
    this.drag = 0.97;
} 

function update() {
  let e_len = server_entities.length;
  for (let i = 0; i < e_len; i++) {
    let e = server_entities[i];

    e.x += e.vx;
    e.y += e.vy;

    e.vx *= e.drag;
    e.vy *= e.drag;
        
    if (e.controllable) {
        if (m_array[0]) {
            e.vx -= e.speed;
         };
        if (m_array[1]) {
            e.vx += e.speed;
        };
        if (m_array[2]) {
             e.vy -= e.speed;
        };
        if (m_array[3]) {
             e.vy += e.speed;
        };
    };
  };
}

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
    server_entities.push(e);
}