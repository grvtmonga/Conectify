const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/connectify_development');


const db= mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting db'))

db.once('open',function(){
    console.log('database is connected');
})

module.exports = db;