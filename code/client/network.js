import { set_local_entities, draw, m_array, local_player } from "./main.js";

const ws = new WebSocket(
  "wss://cautious-goggles-v7777794r7vf69w4-3000.app.github.dev/"
);

ws.onopen = () => console.log("Opened connection.");
ws.onmessage = (m) => {
    let data = JSON.parse(m.data);
    switch (data.type) {
        case "update":
            set_local_entities(data.entities);
            draw();
            break;
        case "assign_player":
            local_player = data.player;
            break;
    }
    console.log("MSG: " + data.context)
    
    ws.send(JSON.stringify({
        type: "client_update",
        player_id: local_player.id,
        input: m_array
    }));
};
ws.onerror = (e) => console.log("Connection error!", e);
ws.onclose = () => console.log("Closed connection.");