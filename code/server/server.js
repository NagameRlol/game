const { log } = require("console");
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

let players = [];

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
    this.owner = -1;
} 

function Player(socket, id, username) {
  this.socket = socket;
  this.id = id;
  this.username = username;
  this.m_array = [false, false, false, false];
}

function find_p_from_ws(targ_ws) {
  players.forEach((p) => {
    if (p.ws === targ_ws) {
      return p;
    }
  });
};

function find_p_from_id(id) {
  players.forEach((p) => {
    if (p.id === id) {
      return p;
    }
  });
};

wss.on("connection", (ws) => {
  console.log("A client connected.");
  ws.send(JSON.stringify({
    type: "msg",
    context: "Client connected."
  }));

  let id = Math.floor(Math.random() * 99999);
  let entity = create_entity(
    id,
    "Entity",
    "#FF0000",
    300 + Math.random() * 300.0, 
    300 + Math.random() * 300.0,
    0,
    0, 
    Math.random() * 15 + 15
  )

  let p = create_player(ws, id, "Player");

  ws.send(JSON.stringify({
    type: "assignPlayer",
    player: () => {
      this.id = id;
    },
    context: "Assigned player with id: " + id
  }));

  entity.owner = p;
});

wss.on("message", (m) => {
  let data = JSON.parse(m.data);
  console.log("Recieved: " + m.data);
  switch (data.type) {
    case "client_update":
      let p = find_p_from_id(data.local_player.id);
      p.m_array = data.input;
  }; 
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on port: 3000.");
});

setInterval(() => {
  update();
}, 10);

let server_entities = [];

for (let i = 0; i < 30; i++) {
  let fling = 2.0;
  let e = create_entity(
    -1, 
    "Test", 
    "#0008ff", 
    400 + Math.random() * 300.0, 
    300 + Math.random() * 300.0, 
    Math.random() * fling - fling / 2, 
    Math.random() * fling - fling / 2, 
    30, 
    false);
}

function update() {
  let e_len = server_entities.length;
  for (let i = 0; i < e_len; i++) {
    let e = server_entities[i];

    e.x += e.vx;
    e.y += e.vy;

    e.vx *= e.drag;
    e.vy *= e.drag;
        
    if (!(e.owner === -1)) {
      if (e.owner.m_array[0]) {
        e.vx -= e.speed;
      };

      if (e.owner.m_array[1]) {
        e.vx += e.speed;
      };

      if (e.owner.m_array[2]) {
        e.vy -= e.speed;
      };

      if (e.owner.m_array[3]) {
        e.vy += e.speed;
      };
    };
  };
  
  players.forEach((p) => {
    p.socket.send(JSON.stringify({
      type: "update",
      entities: server_entities,
      context: "Updated."
    }));
  });
};

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

function create_player(socket, id, username) {
  let p = new Player(socket, id, username);
  players.push(p);
  return p;
};