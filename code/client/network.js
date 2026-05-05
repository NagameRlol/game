import { set_local_entities, draw, set_local_player } from "./main.js";
import { m_array } from "./inputListener.js";

const ws = new WebSocket("wss://cautious-goggles-v7777794r7vf69w4-3000.app.github.dev/");

ws.onopen = () => console.log("Opened connection.");

ws.onmessage = (m) => {
  let data = JSON.parse(m.data);

  switch (data.type) {
    case "update":
      set_local_entities(data.entities);
      draw();
      break;
    case "assign_player":
      set_local_player(data.player);
      break;
  }

  console.log("MSG: " + data.context);
};

ws.onerror = (e) => console.log("Connection error!", e);
ws.onclose = () => console.log("Closed connection.");

setInterval(() => {
  ws.send(JSON.stringify({
    type: "client_update",
    player_id: data.player ? data.player.id : null,
    input: m_array
  }));
}, 50);