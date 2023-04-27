let mongoose=require("mongoose");
require("dotenv").config()

let connect=mongoose.connect(process.env.dbURL)

module.exports={
    connect
}