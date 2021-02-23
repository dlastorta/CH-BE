const express = require('express');
const app = express();
const router = express.Router();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.engine(
    "hbs", 
    handlebars({
        extname:".hbs",
        defaultLayout:"vista.hbs",
        layoutsDir: __dirname + "/views/layouts/",
        partialsDir: __dirname + "/views/partials/",
    })
);

app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static("public"));


let item = require('./item');
let idGen = 1;
//productos
let productos = [
    {
        id:1,
        title:"ruler",
        price:"100",
        thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png"
    }
];


router.get('/',(req,res)=>{
    res.render("vista", { productos: productos});
});


io.on('connection', (socket)=>{
    socket.on('agregar producto',data=>{
        productos.push(new item(idGen,data.title,data.price,data.thumbnail));
        idGen++;
        io.sockets.emit('listar productos', productos);
    });
});

module.exports = router;