const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const handlebars = require('express-handlebars');
const session = require('express-session');
const bCrypt = require('bCrypt');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use('login', new FacebookStrategy({
    clientID: "1468688820163800",
    clientSecret:"70d10ac407c639894b4a8025d040ea10",
    callbackURL: "http://localhost:8080/auth/facebook"
}, 
    function(accessToken,refreshToken,profile,done){
        console.log("p use");
        User.findOrCreate(
            profile.id,
            function(err,user){
                if(err) {return done(err);}
                console.log(profile);
                console.log(user);
                done(null, user)
                
            }
        )
    }
));

passport.use('signup', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function(accessToken,refreshToken, profile, done){
        User.findOrCreate(profile.id, function(err,user){
            if(err) {return done(err)};
            done(null,user)
        })
    })
);


passport.serializeUser((user,done)=>{
    done(null, user._id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    })
});

app.use(bodyParser.urlencoded({ extended: true })); 
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
app.use(passport.initialize());
app.use(passport.session());
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
// Middleware

const checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/login");
    }
};

//Routes
app.get('/',(req,res)=>{
    res.render("login");   
});

app.get('/datos',checkAuthentication,(req,res)=>{
    console.log("datos");
    let user = req.user;
    console.log(user);
    res.render("datos", user);
});

app.get('/failRoute',(req,res)=>{
    res.status(404).render('routing-error',{})
})

app.get('/login',(req,res)=>{
    res.render('login');    
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',passport.authenticate('facebook', {
    successRedirect: '/datos',
    failureRedirect: '/failLogin'
}));

app.post('/login',passport.authenticate('login',{ failureRedirect: '/failLogin'}),(req,res)=>{
    console.log("POST LOGIN");
    let user = req.user;
    res.render("datos", user);  
});

app.get('/failLogin',  (req,res)=>{
    res.status(404).render('login',{})
});


app.get('/logout',(req,res)=>{
    req.logout();
    res.render("logout");   
});

app.get('/signup',(req,res)=>{
    res.render("signup");   
});

app.post('/signup',passport.authenticate('signup',{ failureSignup: '/failSignup'}),(req,res)=>{
    let user = req.user;
    res.render("datos", user);
});

app.get('/failSignup', (req,res)=>{
    res.status(404).render('signup',{})
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});