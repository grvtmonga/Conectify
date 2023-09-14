const User = require('../models/user')

module.exports.profile = async function(req, res){

    if(req.cookies.user_id){
        // console.log(User)
        const user = await User.findById(req.cookies.user_id)
        console.log(user)
        if(user){
            // console.log(user)
            return res.render('user_profile', {
                title: 'User Profile',
                user:user
            })
        }
    }
    else{
        return res.redirect('/users/sign-in')
    }
}
// render sign up page
module.exports.signUp = function(req,res){
    res.render('sign_up',{
        title: 'Connectify | Sign Up'
    })
}

// render sign in page
module.exports.signIn = function(req,res){
    return res.render('sign_in', {
        title: "Coneetify | Sign In"
    });
}

//get the sign up data
module.exports.create = async (req, res) => {
    if (req.body.pwd !== req.body.confirm_pwd) {
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email_ID: req.body.email_ID });

        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error'); // Handle the error gracefully
    }
};


// sign in and create a session for user
module.exports.createSession = async (req,res)=>{
    
    //find the user
    try {
        const user = await User.findOne({ email_ID: req.body.email_ID });
        // console.log(user)
        //handle user found
        if(user){
            //handle password which dont match
            if(user.pwd != req.body.pwd){
                return res.redirect('back')
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        // handle session creation
        }
        else{
            //handle user not found
            console.log('not found')
            return res.redirect('back');
        }

    
    }catch(err){
        console.log('error in finding the userwhile signing in',err)
    }

}