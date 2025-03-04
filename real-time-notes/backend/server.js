require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NoteSchema = new mongoose.Schema({
  room: String,
  content: String,
});
const Note = mongoose.model("Note", NoteSchema);

const onlineUsers = {};

app.get("/notes/:room", async (req, res) => {
  const note = await Note.findOne({ room: req.params.room });
  res.json(note || { room: req.params.room, content: "" });
});

app.post("/notes", async (req, res) => {
  const { room, content } = req.body;
  let note = await Note.findOne({ room });
  if (note) {
    note.content = content;
    await note.save();
  } else {
    note = await Note.create({ room, content });
  }
  res.json(note);
});

app.delete("/notes/:room", async (req, res) => {
  await Note.deleteOne({ room: req.params.room });
  res.json({ message: "Note deleted" });
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    
    if (!onlineUsers[room]) {
      onlineUsers[room] = [];
    }
    onlineUsers[room].push(socket.id);

    io.to(room).emit("update_users", onlineUsers[room]);
    socket.to(room).emit("user_joined", "A new user has joined the room.");
  });

  socket.on("update_note", ({ room, content }) => {
    socket.to(room).emit("receive_update", content);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    
    for (const room in onlineUsers) {
      onlineUsers[room] = onlineUsers[room].filter((id) => id !== socket.id);
      
      io.to(room).emit("update_users", onlineUsers[room]);
      io.to(room).emit("user_left", "A user has left the room.");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
