import { set_local_entities, draw, set_local_player, local_player } from "./app.js";
import { m_array } from "./inputListener.js";

const ws = new WebSocket("wss://effective-succotash-wjjjjjp6jjqf5q4j-3000.app.github.dev/");

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
  let name_input = document.getElementById("name_input");
  let chat_input = document.getElementById("chat_input");
  let color_input = document.getElementById("color_input");
  let color = color_input.value

  ws.send(JSON.stringify({
    type: "client_update",
    player: { 
      id: local_player ? local_player.id : null, 
      username: name_input.value + ": " + chat_input.value,
      color: color
    },
    input: m_array
  }));
}, 50);