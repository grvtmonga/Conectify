const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser');
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');

app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//mongo store is user to store session cookie in db
app.use(session({
    name:'Connectify',
    //change secret before deploying
    secret: 'something',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1/connectify_development',
        autoRemove : 'disabled',
        
    },function(err){
        console.log(err|| 'connect mongo db set-up ok ');
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)


// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
