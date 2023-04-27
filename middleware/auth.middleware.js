const jwt=require("jsonwebtoken")
require("dotenv").config()

const authentication=async(ask,give,next)=>{
let token=ask.headers.authorization
try {
    let decoded=jwt.verify(token,process.env.secret);
    next()
} catch (error) {
    give.send("Not Authorized")
}
}

module.exports={authentication}