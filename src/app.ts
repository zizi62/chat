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

const users = new Map()

app.get('/', (req, res) => {
    res.send(messages);
});

io.on('connection', (socketChannel) => {
    users.set(socketChannel, { id: new Date().getTime().toString(), name: "anonim" })

    io.on('disconnect', ()=>{
        users.delete(socketChannel)
    })
    socketChannel.on('client-name-sent', (name:string)=>{
        const user = users.get(socketChannel)
        user.name = name;
    })

    socketChannel.on("client-message-sent", (message: string) => {
        const user = users.get(socketChannel)
        let messageItem = { message: message, id: new Date().getTime().toString(), user: { id: user.id, name: user.name } }
        messages.push(messageItem)
        socketChannel.emit('new-message-sent', messageItem)
    })
    socketChannel.emit('init-messages-published', messages)

});


const PORT = process.env.PORT || 3009
server.listen(PORT, () => {
    console.log('listening on *:3009' + PORT);
});
