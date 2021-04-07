const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));

let productos = require('./0-routes/productosTest.js');
app.use('/productos', productos);
