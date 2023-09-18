const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async (req,res)=>{
    try{
        console.log(req.user._id)
        const post = await Post.create({
            content:req.body.content,
            user: req.user._id
        })
        return res.redirect('back')
    }
    catch(err){
        
        console.log('error in creating post from controller',err)
        return
        
    }
}

module.exports.destroy = async function(req,res){
    try{
        const post = await Post.findById(req.params.id)
        //.id is the string version of object id which we get from _id
        // console.log(post.user.toString())
        if(post.user.toString() == req.user.id){
            // console.log('in if')
            await Post.deleteOne();

            await Comment.deleteMany({post: req.params.id})
                
            return res.redirect('/')
            
        }
    }
    catch(err){
        console.log('error in deleting the post',err)
        return 
    }
}