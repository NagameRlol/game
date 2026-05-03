const ws = new WebSocket(
  "wss://literate-telegram-44g6746wrp3qxrg-3000.app.github.dev/"
);

ws.onopen = () => console.log("OPEN");
ws.onmessage = (m) => console.log("MSG:", m.data);
ws.onerror = (e) => console.log("ERR", e);
ws.onclose = () => console.log("CLOSE");