const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});

let messages = [
    {author: "Juan", text: "Hola! que tal?"},
    {author: "Pedro", text: "¡Muy Bien! ¿y Vos?"},
    {author: "Ana", text: "Genial!"},
];

io.on('connection', (socket)=>{
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',(data)=>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

