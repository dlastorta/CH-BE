const bodyParser = require('body-parser');
const { UV_FS_O_FILEMAP } = require('constants');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const util = require('util');
print = (objeto) =>{
    console.log(util.inspect(objeto,false,12,true));
}


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
let msgIdGen;
let msgAutores;
let messages;
let productos;

if(typeof msgIdGen === 'undefined'){
    msgIdGen = 1;
} 
if(typeof messages === 'undefined'){
    messages = [];
}
if(typeof msgAutores === 'undefined'){
    msgAutores = []
}

//Routes

app.get('/',(req,res)=>{
    res.render("vista", { productos: productos});
});

//Events
io.on('connection', (socket)=>{
    socket.emit('messages', messages);

    socket.on('new-message',(data)=>{
        if(typeof msgAutores[data.autor.email] === 'undefined'){
            msgAutores[data.autor.email]=0;           
        } else {
            msgAutores[data.autor.email]++;
        }
        
        data.id=msgAutores[data.autor.email];
        data.mensaje.id = msgIdGen;
        msgIdGen++
        messages.push(data);
        fs.writeFileSync('messages.json',JSON.stringify(messages),(err)=>{
            if(err){
                console.log(`Error escribienjdo archivo. error: ${err}`);
            }
        });
        
        let rawData = fs.readFileSync('messages.json');
        let msgs = JSON.parse(rawData);

        const author = new schema.Entity('autor',{},{idAttribute:'email'});
        const msg = new schema.Entity('mensaje');
        const post = new schema.Entity('post',{
            autor: author,
            mensajes:[msg]
        });        
        
        console.log("original L");
        console.log(JSON.stringify(msgs).length);

        const normalizedPosts = normalize(msgs,post)
        
        console.log("normalized L");
        console.log(JSON.stringify(normalizedPosts).length);
        console.log("print normalized");
        print(normalizedPosts)
        console.log("normalized Post");
        console.log(JSON.stringify(normalizedPosts));

        let compresion = ((JSON.stringify(normalizedPosts).length / JSON.stringify(msgs).length ) * 100) + "%"
        console.log(`la compresion es ${compresion}%`);
        io.sockets.emit('messages', msgs);
    });
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});



