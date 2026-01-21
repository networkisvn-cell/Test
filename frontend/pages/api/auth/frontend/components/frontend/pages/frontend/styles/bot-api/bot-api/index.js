const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// In-memory placeholder for player state
let playerState = { title: null, author: null, playing: false };

// Socket namespace for web UI and bots
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // web client requests to send music command
  socket.on("command", (data) => {
    console.log("Received command from web client:", data);
    // broadcast command to bot namespace (or handle authorization)
    io.emit("commandToBot", data); // In practice, emit to authenticated bot sockets only
  });

  // bot can send player updates
  socket.on("playerUpdate", (data) => {
    playerState = { ...playerState, ...data };
    io.emit("playerUpdate", playerState); // broadcast updates to all web clients
  });

  // initial state
  socket.emit("playerUpdate", playerState);

  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Simple REST endpoint for guild stats — this is intended to be called by the actual Discord bot
app.get("/guild/:id/stats", (req, res) => {
  // Example: Bot should call this with real data. For now return placeholder
  res.json({ members: 1245, online: 523 });
});

server.listen(4000, () => console.log("Bot API running on :4000"));
