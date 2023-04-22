const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
require('dotenv').config();
const authRouter=require("./routes/auth.routes")
const {accessToken,userPosts}=require("./controllers/instagram.controller")


const app=express()
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    const {code}=req.query
    if (code) {
        let userdetails
        accessToken(code).then((e)=>userdetails=e)
        userPosts(userdetails.access_token)
    }
    res.sendFile(__dirname + '/index.html')
})

app.get("/users",(req,res)=>{
    res.sendFile(__dirname + '/users.html')
})

mongoose.connect(process.env.URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to http://localhost:${process.env.PORT}`);
    })
})