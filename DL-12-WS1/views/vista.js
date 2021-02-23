const express = rsequire('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const socket = io();
io.on('connection', (socket)=>{
    console.log("Vista - Lista Productos");
});
socket.on('listar productos',(data)=>{
    console.log(data)
    res.render("vista",{ productos: data});
    socket.emit('notificacion', 'Mensaje recibido Exitosamente');
});

