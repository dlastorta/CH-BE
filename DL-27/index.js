const express = require('express');
const app = express();
const server = require('http').Server(app);
const session = require('express-session');
const passport = require('passport');

const MongoStore = require('connect-mongo');
require("./model/user.js"); 
const mongoose = require('mongoose')
var User= mongoose.model('User'); 

let DBUP = () => {
    const uri  = "mongodb+srv://eeoadmin:D722EMPBzMtgG3c@coderhouse.fclea.mongodb.net/eCommerce?retryWrites=true&w=majority";
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB UP');
}
DBUP();

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:"mongodb+srv://eeoadmin:D722EMPBzMtgG3c@coderhouse.fclea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            mongoOptions:{
                useNewUrlParser:true,
                useUnifiedTopology: true
            }
        }),
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        rolling: true, 
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 36000
        }
    }));

const FacebookStrategy = require('passport-facebook').Strategy;
app.use(express.urlencoded({ extended: true })); 
app.use(passport.initialize());
app.use(passport.session());
passport.use('facebook',new FacebookStrategy({
    clientID: "1468688820163800",
    clientSecret: "70d10ac407c639894b4a8025d040ea10",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function(accessToken,refreshToken, profile, done){
        console.log(profile);        
    })
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/failLogin'
}));

app.get('/',passport.authenticate('facebook',{ failureRedirect: '/failLogin'}),(req,res)=>{
    console.log("GET LOGIN");
    console.log(req.user);
    console.log(req.body);    
});

app.post('/login',passport.authenticate('login',{ failureRedirect: '/failLogin'}),(req,res)=>{
    console.log("POST LOGIN");
    let user = req.user;
    res.render("datos", user);  
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});