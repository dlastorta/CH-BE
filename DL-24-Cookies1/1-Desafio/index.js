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

const session = require('express-session')
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
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

let auth = (req,res,next) =>{
    if(req.session && req.session.user === "Diego" && req.session.isAdmin){
        return next();
    } else {
        res.sendStatus(401);
    }
}

//Routes

app.get('/content',auth,(req,res)=>{
    let data = {
        productos: productos,
        posts: parsedData.posts,
        compresion: compresion,
        parsedData: parsedData,
        normalizedPosts: normalizedPosts
    };
    res.render("vista", {data});   
});

app.get('/logout', (req,res)=>{
    let user =  req.session.username
    req.session.destroy();
    res.render("logout",{user})
});

app.get('/login', (req,res)=>{
    res.render("login");    
});

app.post('/login', (req,res)=>{
    if(!(req.body.user === "Diego" && req.body.password === "123"))
    {
        res.sendStatus(401);
    } else {
        console.log(req.session.user);
        if(typeof(req.session) !== 'undefined' && typeof(req.session.user) !== 'undefined'){
            console.log(req.session.user);
            let data = {
                usuario: req.session.user,
                productos: productos,
                
            };
            res.render("vista", {data});  
        } else if(req.body.user === "Diego" && req.body.password === "123"){
            let data = {
                usuario: req.body.user,
                productos: productos
            };
            req.session.user = req.body.user;
            res.render("vista", {data});  
        }
    }
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



