const ws = new WebSocket(
  "wss://literate-telegram-44g6746wrp3qxrg-3000.app.github.dev/"
);

ws.onopen = () => console.log("Opened connection.");
ws.onmessage = (m) => {
    console.log("Recieved server message: ", m.data);
    let m_data = JSON.parse(m.data);
    switch (m_data.type) {
        case "update":
            
            break;
    }
};
ws.onerror = (e) => console.log("Connection error!", e);
ws.onclose = () => console.log("Closed connection.");