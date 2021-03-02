const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.engine(
    "hbs", 
    handlebars({
        extname:".hbs",
        defaultLayout:"index.hbs",
        layoutsDir: __dirname + "/views/layouts/",
        partialsDir: __dirname + "/views/partials/",
    })
);

app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

//productos
let item = require('./item');
let idGen = 1;
let productos = [
    /*{
        id:1,
        title:"ruler",
        price:"100",
        thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png"
    }*/
];
let messages = [];

io.on('connection', (socket)=>{
    console.log('Un cliente se ha conectado');
    

    
});

//Routes

app.get('/',(req,res)=>{
    res.render("vista", { productos: productos});
});

//Events
io.on('connection', (socket)=>{
    socket.on('AgregarProducto',data=>{
        productos.push(new item(idGen,data.title,data.price,data.thumbnail));
        io.emit('ListarProductos', new item(idGen,data.title,data.price,data.thumbnail));
        idGen++;        
    });

    socket.emit('messages', messages);

    socket.on('new-message',(data)=>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});


