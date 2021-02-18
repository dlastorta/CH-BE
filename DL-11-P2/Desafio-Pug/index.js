const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
//Routes
let productos = require('./producto');
app.use('/api', productos);

//server
const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));