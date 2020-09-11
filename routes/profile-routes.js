const router=require('express').Router();

const authCheck=(req,res,next)=>{
	if(!req.user){
		res.redirect('/user/login');
	}
	else{
		next();
	}
}
router.get('/profile',authCheck,((req,res)=>{
	res.render('profile');
}))

module.exports=router;