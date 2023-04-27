let mongoose=require("mongoose");

let schema=mongoose.Schema({
    email:String,
    password:String,
    name:String,
    bio:String,
    phone:Number
})

let UserModel=mongoose.model("users",schema)

module.exports={
    UserModel
}