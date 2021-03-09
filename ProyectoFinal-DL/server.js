const express = require('express');
const app = express();
const router = express.Router();

let productos = require('./routes/productos');
let carrito = require('./routes/carritos');

let isAdmin = true;
let idGenCarro = 1;
let idGenProducto = 1;
app.set('isAdmin', isAdmin);
app.set('idGenCarro', idGenCarro);
app.set('idGenProducto', idGenProducto);

//Routes
app.use('/productos', productos);
app.use('/carrito', carrito);

//server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));