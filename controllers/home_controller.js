const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
module.exports.home = async function(req, res){
    // console.log(req.cookies)
    // res.cookie('user_id',14);
    
    try{
        const posts  = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        })
        const users = await User.find({});
        return res.render('home', {
            title: "Home",
            posts :posts,
            all_users:users
        });
    }
    catch(err){
        console.log('error in fetching post data')
    }

}

// module.exports.actionName = function(req, res){}