const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user-model');


passport.use(new LocalStrategy({usernameField:'email'},((email,password,cb)=>{
	User.findOne({email:email}).then((user)=>{
		if(!user){
			return cb(null,false);}
		if(user.password!=password){
			return cb(null,false);}
		return cb(null,user);
	}).catch((err)=>{console.log(err)})
})))

passport.serializeUser((user,cb)=>{
	console.log(1234);
	cb(null,user.id);
})
passport.deserializeUser((id,cb)=>{
	User.findById(id).then((user)=>{
		cb(null,user);
	})
})