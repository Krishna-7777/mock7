const express=require("express")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const ProfileRoutes=express.Router();

ProfileRoutes.get('/',async(ask,give)=>{
    let decoded=jwt.verify(ask.headers.authorization,process.env.secret);
    try {
        let user=await UserModel.findById(decoded.id);
        give.send(user)
    } catch (error) {
        console.log(error);
        give.send("error")
    }
})

ProfileRoutes.patch('/',async(ask,give)=>{
    let decoded=jwt.verify(ask.headers.authorization,process.env.secret);
    try {
        await UserModel.findByIdAndUpdate(decoded.id,ask.body);
        give.send("Profile Updated")
    } catch (error) {
        console.log(error);
        give.send("error")
    }
})

module.exports={
    ProfileRoutes
}