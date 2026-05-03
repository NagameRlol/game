const websocket = new WebSocket("wss://literate-telegram-44g6746wrp3qxrg-3000.app.github.dev");

socket.onopen = () => console.log("CONNECTED");
socket.onerror = (e) => console.log("ERROR", e);
socket.onclose = () => console.log("CLOSED");