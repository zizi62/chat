import express from 'express'
import http from 'http'
import socketIo from 'socket.io'


// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

const app = express()
const server = http.createServer(app)
const io = socketIo(server)




const messages = [{ message: "Hello TOM", id: "jhffhddf", user: { id: "nvnvn", name: "TOM" } },
{ message: "Hello BOB", id: "jhfgghddf", user: { id: "dddvn", name: "BOB" } }, { message: "Hello NIMM", id: "jhfgddf", user: { id: "dddvn", name: "TIM" } }]


app.get('/', (req, res) => {
    res.send(messages);
});

io.on('connection', (socketChannel) => {

    socketChannel.on("client-message-sent", (message: string) => {
        let messageItem = { message: message, id: 'ab' + new Date().getTime(), user: { id: "dddvn", name: "BOB" } }
        socketChannel.emit('new-message-sent', messageItem)
    })


    socketChannel.emit('init-messages-published', messages)
});


const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log('listening on *:3009' + PORT);
});