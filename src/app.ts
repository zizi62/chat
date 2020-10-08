import express from 'express'
import http from 'http'
import socketIo from 'socket.io'


// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
  res.send('HELLO SERVER');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
  console.log('listening on *:3009');
});