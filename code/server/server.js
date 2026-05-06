const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

let players = [];
let server_entities = [];

function Entity() {
  this.id = -1;
  this.name = "Entity";
  this.color = "#ff0000";
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.size = 20;
  this.speed = 5.0;
  this.drag = 0.7;
  this.owner_id = -1;
  this.shape;
}

function Player(socket, id, username) {
  this.socket = socket;
  this.id = id;
  this.username = username;
  this.m_array = [false, false, false, false];
}

function find_p_from_ws(ws) {
  return players.find(p => p.socket === ws);
}

function find_p_from_id(id) {
  return players.find(p => p.id === id);
}

function create_entity(id, name, color, x, y, vx, vy, size) {
  let e = new Entity();
  e.id = id;
  e.name = name;
  e.color = color;
  e.x = x;
  e.y = y;
  e.vx = vx;
  e.vy = vy;
  e.size = size;
  server_entities.push(e);
  return e;
}

function create_player(socket, id, username) {
  let p = new Player(socket, id, username);
  players.push(p);
  return p;
}

wss.on("connection", (ws) => {
  let id = Math.floor(Math.random() * 99999);

  let p = create_player(ws, id, "Player");

  let entity = create_entity(
    id,
    "Entity",
    "#FF0000",
    300 + Math.random() * 300,
    300 + Math.random() * 300,
    0,
    0,
    Math.random() * 15 + 15
  );

  entity.owner_id = p.id;

  ws.send(JSON.stringify({
    type: "assign_player",
    player: { id },
    context: "Assigned player with id: " + id
  }));

  ws.on("message", (m) => {
    let data;
    try {
      data = JSON.parse(m);
    } catch {
      return;
    }

    switch (data.type) {
      case "client_update": {
        let p = find_p_from_id(data.player_id);
        if (p) p.m_array = [...data.input];
        break;
      }
    }
  });

  ws.on("close", () => {
    players = players.filter(p => p.socket !== ws);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on port: 3000.");
});

setInterval(update, 50);

function update() {
  for (let i = 0; i < server_entities.length; i++) {
    let e = server_entities[i];

    e.x += e.vx;
    e.y += e.vy;

    e.vx *= e.drag;
    e.vy *= e.drag;

    let owner = find_p_from_id(e.owner_id);

    if (e.owner_id !== -1 && owner) {
      if (owner.m_array[0]) apply_force(e, e.speed, -Math.PI / 2);
      if (owner.m_array[1]) apply_force(e, e.speed, Math.PI / 2);
      if (owner.m_array[2]) apply_force(e, e.speed, 0.0);
      if (owner.m_array[3]) apply_force(e, e.speed, Math.PI);
    }
  }

  players.forEach(p => {
    p.socket.send(JSON.stringify({
      type: "update",
      entities: server_entities,
      context: "Updated."
    }));
  });
}

function distance_to(from_x, from_y, to_x, to_y) {
  return Math.sqrt(Math.pow(to_x - from_x, 2) + Math.pow(to_y - from_y, 2));
}

function apply_force(entity, num, angle_rad) {
  entity.vx += Math.cos(angle_rad - Math.PI / 2) * num;
  entity.vy += Math.sin(angle_rad - Math.PI / 2) * num;
}