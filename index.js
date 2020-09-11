const express=require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passport=require('passport');
const passportSetup=require('./config/passport-setup')
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const keys=require('./config/keys');

const app=express();
mongoose.connect(keys.mongodb.dbURI,()=>console.log('Connected to database'));
app.set("view engine",'ejs');
app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:false}))

app.use('/user',authRoutes);
app.use('/protected',profileRoutes);
app.get('/',(req,res)=>{
	res.render("home");
});

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));