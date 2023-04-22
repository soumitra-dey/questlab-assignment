const { Schema, model } = require("mongoose");




const instaUserSchema=new Schema({
    id:{
        type:String,
        unique:true
    },
    media_type:{
        type:String,
    },
    caption:{
        type:Number
    },
    media_url:{
        type:String
    }
})

const instaUser=model("instauser",instaUserSchema)

module.exports=instaUser