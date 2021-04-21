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
let posts;
let productos;

if(typeof msgIdGen === 'undefined'){
    msgIdGen = 1;
} 
if(typeof posts === 'undefined'){
    posts = [];
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
    socket.emit('messages', posts);

    socket.on('new-message',(newPost)=>{
        if(typeof msgAutores[newPost.author.email] === 'undefined'){
            msgAutores[newPost.author.email]=0;           
        } else {
            msgAutores[newPost.author.email]++;
        }
        
        newPost.id=msgAutores[newPost.author.email];
        console.log(newPost);
        newPost.message.id = msgIdGen;
        posts.id = msgIdGen;
        msgIdGen++
        posts.push(newPost);
        fs.writeFileSync('messages.json',JSON.stringify({posts:posts}),(err)=>{
            if(err){
                console.log(`Error escribienjdo archivo. error: ${err}`);
            }
        });
        
        let rawData = fs.readFileSync('messages.json');
        let parsedData = JSON.parse(rawData);
        
        const autor = new schema.Entity('author',{},{idAttribute:'email'});
        const msg = new schema.Entity('message',{},{idAttribute:'id'});
        const post = new schema.Entity('posts',
        {
            posts: [{
                    author: autor,
                    message:[msg]
                }]            
        },{idAttribute:'id'});        
        const normalizedPosts = normalize(parsedData,post)
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



