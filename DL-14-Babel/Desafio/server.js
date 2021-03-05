var bodyParser = require('body-parser');
var UV_FS_O_FILEMAP = require('constants').UV_FS_O_FILEMAP;
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));
//productos
var item = require('./item');
var idGen;
var messages;
var productos;
if (typeof idGen === 'undefined') {
    idGen = 1;
}
if (typeof messages === 'undefined') {
    messages = [];
}
if (typeof productos === 'undefined') {
    productos = [];
}
//Routes
app.get('/', function (req, res) {
    res.render("vista", { productos: productos });
});
//Events
io.on('connection', function (socket) {
    socket.on('AgregarProducto', function (data) {
        productos.push(new item(idGen, data.title, data.price, data.thumbnail));
        io.emit('ListarProductos', new item(idGen, data.title, data.price, data.thumbnail));
        idGen++;
    });
    socket.emit('messages', messages);
    socket.on('new-message', function (data) {
        messages.push(data);
        fs.writeFile('messages.json', JSON.stringify(messages), function (err) {
            if (err) {
                console.log(err);
            }
        });
        io.sockets.emit('messages', messages);
    });
});
//server
server.listen(8080, function () {
    console.log("Server Up en 8080");
});
