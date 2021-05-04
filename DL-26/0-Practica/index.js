const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const handlebars = require('express-handlebars');
const session = require('express-session');
const bCrypt = require('bCrypt');

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000
    }
}));
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
let auth = (req,res,next) =>{
    if(req.session && req.session.user === "Diego" && req.session.isAdmin){
        return next();
    } else {
        res.sendStatus(401);
    }
}
//Routes

app.get('/',(req,res)=>{
    res.render("login");   
});

app.get('/login',(req,res)=>{
    res.render("login");   
});

app.post('/login',(req,res)=>{
    res.render("login");   
});

app.get('/register',(req,res)=>{
    res.render("register");   
});

app.post('/register',(req,res)=>{
    data = {
        user: req.body.user,
        password: req.body.password
    }
    res.render("login",{data});   
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});