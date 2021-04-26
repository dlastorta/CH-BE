const express = require ('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const MongoStore = require('connect-mongo');
app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        mongoUrl: "",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
        
    }),
    secret: 'shhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false/*,
    cookie: {
        maxAge: 400000
    }*/
}))



