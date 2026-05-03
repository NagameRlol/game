import * as Main from "./main.js";

const ws = new WebSocket(
  "wss://literate-telegram-44g6746wrp3qxrg-3000.app.github.dev/"
);

ws.onopen = () => console.log("Opened connection.");
ws.onmessage = (m) => {
    console.log("Recieved server message: ", m.data);
    let m_data = JSON.parse(m.data);
    switch (m_data.type) {
        case "update":
            Main.local_entities = m_data.entities;
            break;
    }
};
ws.onerror = (e) => console.log("Connection error!", e);
ws.onclose = () => console.log("Closed connection.");