const router=require('express').Router();
const passport=require('passport');
const User=require('../models/user-model')

router.get('/signup',(req,res)=>{
	res.render('signup');
});
router.post('/signup',(req,res)=>{
	new User({
		username:req.body.username,
		email:req.body.email,
		password:req.body.passwd
	}).save().then((user)=>{
		console.log(user);
	});
	res.redirect('/user/login');
})
router.get('/login',(req,res)=>res.render('login'));
router.post('/login',passport.authenticate('local',{
		successRedirect:'/protected/profile',
		failureRedirect:'/user/login'
	}),(req,res)=>{
	console.log('hella mia');
	res.send("hello")
});
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
});


module.exports=router;