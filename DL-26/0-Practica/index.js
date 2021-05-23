const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const handlebars = require('express-handlebars');
const session = require('express-session');
const bCrypt = require('bCrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { use } = require('passport');
const cookieParser = require('cookie-parser');

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

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, 
    function(req,username,password,done){
        User.findOne(
            {'username': username},
            function(err,user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false,console.log('message', 'User Not Found'));
                }
                if(!isValidPassword(user,password)){
                    return done(null, false, console.log('message', 'Invalid Password'));
                }
                return done(null, user);
            }
        )
    }
));

passport.use('signup', new LocalStrategy(
    {passReqToCallback:true},
    function(req,username, password, done){
        let findOrCreateUser = () =>{
            User.findOne({'username':username},(err,user)=>{
                if(err){
                    console.log('Error in Signup: ' + err);
                    return done(err);
                }
                if(user){
                    return done(null,false,console.log("message","User already exists"));
                } else {
                    let newUser = new User();
                    newUser.username = username,
                    newUser.password = createHash(password),
                    newUser.email = req.body.email                    

                    newUser.save((err)=>{
                        if(err){
                            console.log('Error in Saving User: ' + err);
                            throw err;
                        }
                        console.log("signup Successful");
                        return done(null,newUser);
                    });
                }
            });            
        };
        process.nextTick(findOrCreateUser);
    })
)

passport.serializeUser((user,done)=>{
    done(null, user._id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    })
});

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null);
};

const isValidPassword = (user,password) => {
    return bCrypt.compareSync(password, user.password);
};

app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(cookieParser)
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
/*app.get('*', (req,res)=>{
    console.log('*')
    res.status(404).render('routing-error',{}); 
});*/
app.get('/',(req,res)=>{
    res.render("login");   
});

app.get('/datos',checkAuthentication,(req,res)=>{
    let user = req.user;
    console.log(user);
    res.render("datos", user);
});

app.get('/failRoute',(req,res)=>{
    res.status(404).render('routing-error',{})
})

app.get('/login',(req,res)=>{
    if(req.isAuthenticated()){
        let user = req.user;
        res.render("datos", user);          
    } else {
        res.render('login')
    }    
});

app.post('/login',passport.authenticate('login',{ failureRedirect: '/failLogin'}),(req,res)=>{
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