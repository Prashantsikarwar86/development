const express=require("express");
const user=require('../models/User')
const router=express.Router();
const passport=require('passport');


router.post('/register',async(req,res)=>{
    let {username,email,password}=req.body;

    const newuser=new user({email,username});
    
    const adduser=await user.register(newuser,password);//to put in db 
    res.send(adduser)
    
    
    
})



router.post('/login',
 passport.authenticate('local',{
    failureRedirect:'/login',
    failureMessage:true
 })
,(req,res)=>{
    console.log(req.user);
    res.send({msg:"login successfull"});
})

router.get('/logout',(req,res)=>{
    ()=>{
        req.logout() 
    }
    res.redirect('/login');
})

module.exports=router;