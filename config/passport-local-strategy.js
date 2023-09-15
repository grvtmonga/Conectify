const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')
// authentciation using passport
console.log('in passport')
// passport.use(new LocalStrategy({
//     usernameField : 'email',
//     // passReqToCallback:true,
//     },
//     function(email,password,done){
//         console.log('hsfi')
//         User.findOne({email:email},function(err,user){
//             if(err){
//                 console.log('error in finding user using passport',err)
//                 return done(err)
//             }
//             if(!user || user.password != password){
//                 console.log('invalid email id or password')
//                 return done(null,false)
//             }
//             return done(null,user)
//         })
//     }

// ));
passport.use(new LocalStrategy({
    usernameField:'email',
    },
    async function(email,password,done){
        try{
            const user = await User.findOne({email})
            if(!user || user.password!==password){
                console.log('invalid username or password')
                return done(null,false)
            }
            return done(null,user)

        }catch(err){
            console.log('error in finding user')
            return done(err)
        }
    }
))

//serializing the user to decide which key should be put in cookie
passport.serializeUser(function(user,done){
    console.log('serialize')
    done(null,user.id);
})

//deserializong the user from the cookies
passport.deserializeUser(async (id,done)=>{
    
    const user = await User.findById(id)
    console.log('deserialize',user)
    try{
        return done(null,user)
    }
    catch(err){
        console.log('error in finding user')
        return done(err)
    }
})
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         if (err) {
//             console.log('error in finding user --> passport');
//             return;
//         }
//         return done(null, user);
//     });
// });


//middleware for checking if user is auuthenticated or not
passport.checkAuthentication = function(req,res,next){
    //if user is authenticated then pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        next()
    }
    //if user is not signed in
    else{
        return res.redirect('/users/sign-in')
    }
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        
    }
    next();
}
module.exports=passport;