let express=require("express")
const { UserRouter } = require("./routes/user.route")
const { connect } = require("./config/db")
const { authentication } = require("./middleware/auth.middleware")
const { ProfileRoutes } = require("./routes/profile.route")

const app=express()

app.get('/',(ask,give)=>{
    give.send("Authentication App")
})
app.use(express.json())

app.use('/user',UserRouter)

app.use(authentication)

app.use('/profile',ProfileRoutes)

app.listen(4000,()=>{
    try {
        connect
    console.log("Connected to the DB & Server is running at 4000...")
    } catch (error) {
         console.log("Error")
    }
})