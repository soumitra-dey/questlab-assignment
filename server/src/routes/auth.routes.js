const express=require("express")

const app=express.Router()
const postModel=require("../models/instaPosts.model")


app.get("/",async(req,res)=>{
    try{
        let users=await postModel.aggregate( [ { $group : { _id : "$userId" } } ] )
        res.send(users)
    }catch(e){
        res.send(e)
    }
})

app.get("/posts",async(req,res)=>{
    const {userId}=req.query
    try{
        let users=await postModel.find({userId})
        res.send(users)
    }catch(e){
        res.send(e)
    }
})





module.exports=app