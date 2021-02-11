const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

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

app.put('/',(req,res)=>{
    res.send('Put Request received');
});

app.delete('/',(req,res)=>{
    res.send('Get Request received');
});

//Routes
let productos = require('./producto');
app.use('/api', productos);

//server
const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server Up en Puerto: ${PORT}`);
});
server.on('error',error=> console.log(`Server Error: ${error}`));