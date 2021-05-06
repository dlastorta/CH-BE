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
                if(!isValidPassword(user,passwor)){
                    console.log("Invalid Password");
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
        let findOrCreateUse = () =>{
            User.findOne({'username':username},(err,user)=>{
                if(err){
                    console.log('Error in Signup: ' + err);
                    return done(err);
                }
                if(user){
                    console.log("User already exists");
                    return done(null,false,console.log("message","User already exists"));
                } else {
                    let newUser = new User();
                    newUser.username = username,
                    newUser.password = password,
                    newUser.email = req.body.email,
                    newUser.firstName = req.body.firstName,
                    newUser.lastName = req.body.lastName

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
        process.nextTick(findOrCreateUse);
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

const createHash = () => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10),null);
};

const isValidPassword = (user,password) => {
    return bCrypt.compareSync(password, user.password);
};

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser)
app.use(session({
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
let auth = (req,res,next) =>{
    if(req.session && req.session.user){
        return next();
    } else {
        res.render("login", {error:"Usted no esta autorizado."});
    }
}

// Middleware

const checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/login");
    }
};

//Routes

app.get('*', (req,res)=>{
    console.log('*')
    res.status(404).render('routing-error',{}); 
});
app.get('/',(req,res)=>{
    console.log('/')
    res.render("login");   
});

app.get('/datos',checkAuthentication,(req,res)=>{
    /*if(true ){
        let data = req.user
        res.render("datos",{data});
    } else {
        res.render("login", {error:"Usted no esta autorizado."});
    }*/
    console.log('datos')
    res.render("datos");
});

app.get('/failRoute',(req,res)=>{
    console.log('failRoute')
    res.status(404).render('routing-error',{})
})

app.get('/login',(req,res)=>{
    if(req.isAuthenticated()){
        console.log('if login')
        let user = req.user;
        res.render('login', { user });   
    } else {
        console.log('else login')
        res.render('login')
    }    
});

app.post('/login',passport.authenticate('login',{ failureRedirect: '/failLogin'},(req,res)=>{
    let user = req.user;
    console.log('profileUser')
    res.render('profileUser');
}));
app.get('/failLogin',  (req,res)=>{
    console.log('failLogin')
    res.status(404).render('login-error',{})
});


app.get('/logout',(req,res)=>{
    console.log('logout')
    req.logout();
    res.render("index");   
});

app.get('/signup',(req,res)=>{
    console.log('signup')
    res.render("signup");   
});

app.post('/signup',passport.authenticate('signup',{ failureSignup: '/failSignup'},(req,res)=>{
    let user = req.user;
    console.log('psignup')
    res.render('profileUser');
}));
app.get('/failSignup', (req,res)=>{
    console.log('failSignup')
    res.status(404).render('signup-error',{})
});

//server
server.listen(8080, ()=>{
    console.log("Server Up en 8080");
});