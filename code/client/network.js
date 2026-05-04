import { set_local_entities, draw, m_array } from "./main.js";

const ws = new WebSocket(
  "wss://ideal-waffle-944444rv5g4cr5p-3000.app.github.dev/"
);

ws.onopen = () => console.log("Opened connection.");
ws.onmessage = (m) => {
    let m_data = JSON.parse(m.data);
    switch (m_data.type) {
        case "update":
            set_local_entities(m_data.entities);
            draw();
            break;
    }
    console.log("MSG: " + m_data.context)

    ws.send({
        type: "client_update",
        input: m_array
    })
};
ws.onerror = (e) => console.log("Connection error!", e);
ws.onclose = () => console.log("Closed connection.");