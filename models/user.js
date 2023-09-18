const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

const userSchema= new mongoose.Schema({
    email :{
        type : String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        
    },
    bio:{
        type:String,
    }
}, {
    timestamps:true,
});

const User = mongoose.model('User',userSchema);

module.exports = User;