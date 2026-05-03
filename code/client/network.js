const websocket = new WebSocket("wss://literate-telegram-44g6746wrp3qxrg-3000.github.dev/");

websocket.addEventListener("open", () => {
  console.log("CONNECTED");
});