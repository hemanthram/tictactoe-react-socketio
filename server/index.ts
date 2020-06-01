import { createServer } from "http"
import express from "express"
import router from "./router"
import socketio from "socket.io"
import { setState, addUser, removeRoom, isGameOver } from "./game"

interface Hash {
  [details: string] : string;
} 

// import cors from "cors"
const PORT = 8080
let tmp:any;
let acusers = 0;
let socketroom:Hash = {};
const app = express()
const server = createServer(app)
const io = socketio(server)
io.on('connect', async (socket) => {

  socket.on('join', (user, room, callback) => {
    acusers += 1;
    console.log(`${acusers} users active`)

    let f = addUser(user, room)
    if(f === 0) { return callback('Room not available, try different name please') }
    socket.join(room) 
    socketroom[socket.id] = room
    if(f === 1) { socket.emit('assignPlayer', {assign:1}) }
    if(f === 2) {
      socket.emit('assignPlayer', {assign:2})
      io.to(room).emit('game')
      io.to(room).emit('turnChange', {turn:0})
    }    
  })

  socket.on('play', ({room, id, pos}:any) => {
      tmp = setState(room, id, pos);
      const winner = isGameOver(tmp.board)
      if(winner === -1){
        io.to(room).emit('stateChange', tmp.board)
        io.to(room).emit('turnChange', {turn:tmp.turn})
      }
      else io.to(room).emit('gameOver', winner)
  })

  socket.on('disconnect', () => {
    tmp = socketroom[socket.id]
    delete socketroom[socket.id]
    removeRoom(tmp)
    io.to(tmp).emit('userLeft')
    acusers -= 1;
    console.log(`${acusers} active`)
  })
})
// app.use(cors)
app.use(router)

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));