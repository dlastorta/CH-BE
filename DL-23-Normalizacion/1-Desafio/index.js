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

const { v4: uuidv4 } = require('uuid');
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
let users;
let items;
let productos;

if(typeof msgIdGen === 'undefined'){
    msgIdGen = 1;
} 
if(typeof items === 'undefined'){
    items = [];
}
if(typeof msgAutores === 'undefined'){
    msgAutores = []
}
if(typeof users === 'undefined'){
    users = []
}

//Routes

app.get('/',(req,res)=>{
    res.render("vista", { productos: productos});
});

//Events
io.on('connection', (socket)=>{
    socket.emit('messages', items);

    socket.on('new-message',(newPost)=>{
        if(typeof msgAutores[newPost.author.email] === 'undefined'){
            msgAutores[newPost.author.email]=0;           
        } else {
            msgAutores[newPost.author.email]++;
        }
        debugger;
        if(!users.includes(newPost.author.email)){
            users.push(newPost.author.email)
            newPost.author.uId = users.length+1
        } else {
            newPost.author.uId = users.indexOf(newPost.author.email)
        }
        
        newPost.pId="p"+msgAutores[newPost.author.email];
        newPost.message.mId = "m"+msgIdGen;
        newPost.message.author = newPost.author;
        msgIdGen++
        items.push(newPost);
        fs.writeFileSync('messages.json',JSON.stringify({posts: items}),(err)=>{
            if(err){
                console.log(`Error escribienjdo archivo. error: ${err}`);
            }
        });
        
        let rawData = fs.readFileSync('messages.json');
        let parsedData = JSON.parse(rawData);
        
        const user = new schema.Entity('users',{},{idAttribute:'uId'});
        const msg = new schema.Entity('messages',{
            author: user
        },{idAttribute:'mId'});
        const post = new schema.Entity('posts',{
            author: user,
            message: msg
        },{idAttribute:'pId'});
        const mySchema = {posts:[post]};

        console.log(parsedData);
        const normalizedPosts = normalize(parsedData,mySchema)
        let compresion = ((JSON.stringify(normalizedPosts).length / JSON.stringify(parsedData).length ) * 100) + "%"
        let feData = {
            posts: parsedData.posts,
            compresion: compresion,
            parsedData: parsedData,
            normalizedPosts: normalizedPosts
        }
        io.sockets.emit('messages', feData);
    });
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});



