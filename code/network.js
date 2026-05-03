const websocket = new WebSocket("https://nagygame.vercel.app/");

websocket.addEventListener("open", () => {
  console.log("CONNECTED");
});