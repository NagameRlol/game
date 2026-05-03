const websocket = new WebSocket("wss://literate-telegram-44g6746wrp3qxrg-3000.app.github.dev/");

websocket.onopen = () => console.log("CONNECTED");
websocket.onerror = (e) => console.log("ERROR", e);
websocket.onclose = () => console.log("CLOSED");