const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

const userSchema= new mongoose.Schema({
    email_ID :{
        type : String,
        required: true,
        unique: true,
    },
    pwd:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        
    }
}, {
    timestamps:true,
});

const User = mongoose.model('User',userSchema);

module.exports = User;