import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Server is healthy!");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Someone connected with ${socket.id} id.`);
});

server.listen(8000, () => {
  console.log("Server listening on PORT 8000");
});
