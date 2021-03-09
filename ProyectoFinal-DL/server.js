const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

let productos = require('./routes/productos');
let carrito = require('./routes/carrito');

let isAdmin = true;

router.use( '', (req, res, next) => {
    if(!isAdmin) next('route');
    next();
  });

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/',(req,res)=>{
    res.send('Get Request received');
});

app.get('/index',(req,res)=>{
    res.sendFile(__dirname + "\\index.html");
});

app.post('/',
    (req,res,next)=>{
        console.log("Middleware!");
        console.log(req.body);
        next();    
    },
    (req,res)=>{
    res.send('Post Request received');
});

//Routes
app.use('/productos', productos);
app.use('/carrito', carrito);

//server
const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));