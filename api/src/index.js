const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const {OAuth2Client}=require('google-auth-library');
const postRoute=require('./routes/post');
const commentRoute=require('./routes/comment'); 
const authRoute=require('./routes/auth');
const userRoute=require('./routes/user');
dotenv.config();

const app =express();
const main=async()=>{
    try{
        await mongoose.connect(process.env.MOGO_KEY);
        console.log('mongoose');
    }catch(err){
        console.log(err)
    }
}
// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
  )
  // Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
  })
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
    const errStatus=err.status || 500
    const errMessage=err.message || "something went wrong "
    return res.status(errStatus).json({
        success:false,
        message:errMessage,
        status:errStatus,
        stack:err.stack
    })
})
app.listen(5000,()=>{
    console.log('connect');
    main();
})