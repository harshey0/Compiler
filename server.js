const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS  = require("./src/Actions.js");


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;
const userSocketMap = {};
const getAllClients = (roomId) => {
  
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on(ACTIONS.JOIN, ({roomId,username}) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllClients(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
