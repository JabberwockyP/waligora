const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

let tabGraczy = []


io.on('connection', (socket) => {
    // io.emit("connection")

    tabGraczy.push(socket.id)
    io.emit("dolaczyl", tabGraczy)

    socket.on("ruszajL", (data) => {
      socket.broadcast.emit("ruszajL", data)
    })

    socket.on("ruszajP", (data) => {
      socket.broadcast.emit("ruszajP", data)
    })

    socket.on("wyrwidabP", () =>{
      socket.broadcast.emit("wyrwidabP")
  })
  socket.on("waligoraP", () =>{
    socket.broadcast.emit("waligoraP")
})

socket.on("waligoraL", () =>{
  socket.broadcast.emit("waligoraL")
})

socket.on("kuponyNaPiwoWyrwidaba", kupony =>{
  socket.broadcast.emit("kuponyNaPiwoWyrwidaba", kupony)
})

socket.on("kuponyNaPiwoWaligory", kupony =>{
  socket.broadcast.emit("kuponyNaPiwoWaligory", kupony)
})
socket.on("czekajCwaniaku", id => {
  socket.emit("czekajCwaniaku", id)
})
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});