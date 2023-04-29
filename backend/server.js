"use strict";
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socketio = require("socket.io")
const io = socketio(server)
const { PORT, IOPORT } = require("./config");

server.listen(IOPORT, () => {
  console.log(`IO Server is Quannected to Port ${IOPORT}`)
})

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});