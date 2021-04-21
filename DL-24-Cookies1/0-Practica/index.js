let express = require('express');
let cookieParser = require('cookie-parser');
const session = require('express-session');

var PORT = process.env.port || 3000

let app = express();
app.use(cookieParser());
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))

app.get('/set',(req,res)=>{
    res.cookie('server','express').send('Cookie Set');
});

app.get('/setEx', (req,res)=>{
    res.cookie('server2','express2',{maxAge: 30000}).send('Cookie SetEx');
});

app.get('/get', (req,res)=>{
    res.send(req.cookies.server);
    res.send(req.cookies.serve2);
});

app.get('/clr',(req,res)=>{
    res.clearCookie('server').send('Cookie Clear');
});

app.get('/con-session',(req,res)=>{
    if(req.session.contador){
        req.session.contador++
        res.send(`${req.session.contador}`)
    }
    else {
        req.session.contador = 1;
        res.send('Bienvenido!')
    }
});

app.get('/oldLogout',(req,res)=>{
    res.session.destroy( err =>{
        if(!err) res.send('logout OK!')
        else res.send({status: 'error', body: err})
    })
});

app('/login',(req,res)=>{
    if(!res.query.username || !req.query.password) {
        res.send('login failed!')
    } else if(req.query.username === 'amy' || req.query.password === "amypassword"){
        req.session.user = "amy";
        req.session.admin = true;
        res.send('login success');
    }
});

let auth = (req,res,next) => {
    if(req.session && req.session.user === "amy" && req.session.admin)
        return next();
    else 
        return res.sendStatus(401);
};

app.get('/content',auth,(req,res)=>{
    res.send("You can only see this after you logged in");
});

app.get('/logout',(req,res)=>{
    res.session.destroy();
    res.send("logout!");
});

