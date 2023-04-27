const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../models/user.model")

let UserRouter=express.Router()

UserRouter.post('/register',async(ask,give)=>{
    let {email,password}=ask.body;
    try {
        let userSearch=await UserModel.find({email});
        if(userSearch.length){
            give.send("You are already registered, please Login!")
        }else{
             let hash=await bcrypt.hash(password,2);
         let user=new UserModel({email,"password":hash});
    await user.save();
    give.send("Succesfully Registered!")
        }
    } catch (error) {
        console.log(error)
      give.send("Registration Unsuccesfull, Please Try Again!")  
    }
})

UserRouter.post('/login',async(ask,give)=>{
    let {email,password}=ask.body;
    try {
         let user=await UserModel.find({email});
         if(user.length){
            let hash=user[0].password
        const res=bcrypt.compare(password,hash);
        if(res){
            let token=await jwt.sign({id:user[0]._id},process.env.secret)
            give.send({msg:"Login Succesfull!",token})
        }else{
            give.send({msg:"Wrong Credentials!"})
        }
         }else{
            give.send({msg:"Please Register First!"})
         }
    } catch (error) {
        console.log(error)
      give.send({msg:"Login Unsuccesfull, Please Try Again!"})  
    }
})

module.exports={
    UserRouter
}