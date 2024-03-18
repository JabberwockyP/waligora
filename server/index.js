import { createServer } from "http";
import { Server } from "socket.io";

const HTTPSERVER = createServer();
const io = new Server(HTTPSERVER, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on("connection", socket => {
    console.log(`Good moaning ${socket.id}`);

    socket.on("message", data =>{
        console.log(data);
        io.emit("message",`${data}`);
    })
})

HTTPSERVER.listen(3500, () => console.log("listening on port 3500"))