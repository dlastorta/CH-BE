const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

let productos = require('./routes/productos.js');
let carrito = require('./routes/carrito');

//Routes
app.use('/productos', productos);
app.use('/carrito', carrito);

//server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));