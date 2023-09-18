const User = require('../models/user')

module.exports.profile = async function(req, res){
    try{
        const user = await User.findById(req.params.id)
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
    })
    }
    catch(err){
        console.log('error in profile rendering ',err)
    }
    }
module.exports.update = async (req,res) =>{
    console.log('in exports')
    try{
        if(req.user.id==req.params.id){
            
            await User.findByIdAndUpdate(req.params.id,req.body)
            // console.log(user)
            return res.redirect('back')
        }
    }catch(err){
        console.log('error in updating profile',err)
    }
}
// render sign up page
module.exports.signUp = function(req,res){

    // if(req.isAuthenticated){
    //     return res.redirect('/users/profile')
    // }
    res.render('sign_up',{
        title: 'Connectify | Sign Up'
    })
}

// render sign in page
module.exports.signIn = function(req,res){
    // if(req.isAuthenticated){
    //    return  res.redirect('/users/profile')
    // }
    return res.render('sign_in', {
        title: "Coneetify | Sign In"
    });
}

//get the sign up data
module.exports.create = async (req, res) => {
    if (req.body.password !== req.body.confirm_pwd) {
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });

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
module.exports.createSession = function(req,res){
    // if(passport.checkAuthentication){

    // }
    return res.redirect('/')
}

module.exports.destroySession = (req, res) => {
    req.logout(function(err) {
        if (err) { 
            console.log('error in logging out')
            return next(err); }
        });
  
    return res.redirect('/');
  };
  