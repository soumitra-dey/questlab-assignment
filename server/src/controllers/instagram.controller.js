require('dotenv').config();
const axios=require("axios")
const FormData = require('form-data');
const instaModel=require("../models/instaPosts.model")

const accessToken = async(code) => {
    const form = new FormData();
      form.append('client_id', process.env.client_id);
      form.append('client_secret', process.env.client_secret);
      form.append('grant_type', process.env.grant_type);
      form.append('redirect_uri', process.env.redirect_uri);
      form.append('code', code);

      const response = await axios.post(
        'https://api.instagram.com/oauth/access_token',
        form,
        {
          headers: {
            ...form.getHeaders()
          }
        }
    )
    return response.data
}




const userPosts = (accessToken,user_id) => {
    axios('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=' + accessToken)
    .then(async(data) => {
        let xx=await data.data.data.map((el)=>{
          el["userId"]=user_id
          return el
        })
        await instaModel.insertMany(xx)
    })
    .catch(error => {
        console.log(error)
    })
}





module.exports={
    accessToken,
    userPosts
}