const Comment = require('../models/comment');
const Post = require('../models/post');
const { findById } = require('../models/user');

module.exports.create = async (req,res)=>{
    try{
        const post = await Post.findById(req.body.post)
        if(post){
            const comment = await Comment.create({
                content : req.body.content,
                post: req.body.post,
                user : req.user._id
            })
            post.comments.push(comment)
            post.save()
        }
        

        res.redirect('/')
    }
    catch(err){
        console.log('error in rendering comment',err)
    }
}

module.exports.destroy = async (req,res)=>{
    // const post = findById(req.params.id)
    // console.log('in export')
    try{
        const comment = await Comment.findById(req.params.id)
        const post_id = comment.post;
        // console.log('post id',post_id)
        const post  = await Post.findById(post_id)
        // console.log('post details',post.user)
        // console.log('comment user  id',comment.user)
        // console.log('req.user.id',req.user.id)
        if(comment.user==req.user.id || req.user.id == post.user.toString()){
        
            

            await comment.deleteOne();

            await Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}});

            return res.redirect('/')
        }
    }
    catch(err){
        console.log('error in deleting the comment',err)
    }
}