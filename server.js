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
const matches = new Map()

function listOfUsers(io) {
  io.emit("list_of_users", {
    users: Array
      .from(users.values())
      .map(user => user.name)
  });
}
function players(name) {
  return Array
    .from(users.values())
    .filter(user => user.name === name)
}

io.on("connection", socket => {
  socket.on("new_user", ({name}) => {
    users.set(socket.id, {id: socket.id, name})
    listOfUsers(io)
  });
  socket.on("disconnect", () => {
    users.delete(socket.id)
    listOfUsers(io)
  });
  socket.on("request_new_match", ({ player, player2 }) => {
    players(player)
      .map(player => {
        players(player2)
          .map(player2 => {
            matches.set(1, {
              status: "pending",
              player,
              player2
            })
            socket
              .to(player2.id)
              .emit("request_match");
          })
      })
  });
  socket.on("match_accepted", () => {
    const match = matches.get(1)
    socket
      .to(match.player.id)
      .emit("show_match", match);
    socket
      .emit("show_match", match);
  });
});

const listening = () => console.log("listening to port " + process.env.PORT)

server.listen(process.env.PORT, listening)