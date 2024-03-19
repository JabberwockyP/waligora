const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    io.emit("connection")

    socket.on("yo", (siema) => {
      console.log(siema)
      socket.broadcast.emit("lewy", siema)
    })
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});