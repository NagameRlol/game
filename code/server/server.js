const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

let websockets = [];
let players = [];

function Player() {
  this.socket;
  this.id;
  this.username;
  this.entity;
}

wss.on("connection", (ws) => {
  console.log("A client connected.");
  ws.send(JSON.stringify({
    type: "msg",
    context: "Client connected."
  }));
  websockets.push(ws);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on port: 3000.");
});

setInterval(() => {
  update();
}, 10);

let server_entities = [];

for (let i = 0; i < 10; i++) {
  let e = create_entity(
    -1, 
    "Test", 
    "#62ff00", 
    300, 
    300 + Math.random() * 100.0, 
    0.5 + Math.random(), 
    0, 
    30, 
    false);
  e.drag = 1.0;
}


function Entity () {
    this.id = -1;
    this.name = "Entity";
    this.color = "#ff0000";
    this.x = 0.0;
    this.y = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.size = 20.0;
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
  
  websockets.forEach((ws) => {
    ws.send(JSON.stringify({
      type: "update",
      entities: server_entities
    }));
  });
}

function create_entity(id, name, color, x, y, vx, vy, size) {
    let e = new Entity;
    e.id = id;
    e.name = name;
    e.color = color;
    e.x = x;
    e.y = y;
    e.vx = vx;
    e.vy = vy;
    e.size = size;
    server_entities.push(e);
    return e
}