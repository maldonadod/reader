const path = require("path");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get("/dados", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

const users = new Map()

function listOfUsers(io) {
  io.emit("list_of_users", {
    users: Array.from(users.values())
  });
}

io.on("connection", socket => {
  socket.on("new_user", ({name}) => {
    users.set(socket.id, name)
    listOfUsers(io)
  });
  socket.on("disconnect", () => {
    users.delete(socket.id)
    listOfUsers(io)
  });
  socket.on("fight", (data) => {
    console.log(data)
  });
});

const listening = () => console.log("listening to port " + process.env.PORT)

server.listen(process.env.PORT, listening)