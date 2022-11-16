const jwt=require('jsonwebtoken');
const User=require('../models/user');
const CryptoJS=require('crypto-js');
const nodemailer=require('nodemailer');
const {createError}=require('../utils/createError');

const register=async(req,res,next)=>{
    try{
        const newUser=new User(
            {email:req.body.email,
            userName:req.body.userName,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY).toString()});
        const userSaved=await newUser.save();
        const {password,...details}=userSaved._doc;
        const token_access=jwt.sign({id:userSaved._id,isAdmin:userSaved.isAdmin},process.env.JWT_KEY,{expiresIn:"4d"});
        res.status(200).json({...details,token_access});
    }catch(err){
        next(err);
    }
}
const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return next();
        }
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.CRYPTOJS_KEY).toString(CryptoJS.enc.Utf8)
        if(hashedPassword!==req.body.password){
            return next();
        }
        const {password,...details}=user._doc;
        const token_access=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:"4d"});
        res.status(200).json({...details,token_access});
    }catch(err){
        next(err);
    }
}
const fotgotPassword=async(req,res,next)=>{
    const {email}=req.body;
    try{
        const oldUser=await User.findOne({email});
        if(!oldUser){
            return next(createError(400,"Email not valid"));
        }
        const token=jwt.sign({userName:oldUser.userName,isAdmin:oldUser.isAdmin},process.env.JWT_KEY,{expiresIn:"5m"});
        const link = `http://localhost:5000/api/auth/reset-password/${oldUser._id}/${token}`;
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type: 'OAuth2',
                user:"nguyenquochaolop91@gmail.com",
                clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: process.env.GOOGLE_MAILER_ACCESS_TOKEN
               
            }
        });
        const mailOptions={
          
            to:oldUser.email,
            subject:"Password Reset",
            text:link,
        }
       await transporter.sendMail(mailOptions,function(error,info){
            if(error){
                return next(error);
            }
            else{
                res.status(200).json("Email send" + info.response);
            }
        })
    }catch(err){
        next(err);
    }
}
const requestResetPassword=async(req,res,next)=>{
    const {id,token}=req.params;
    const oldUser=await User.findById(id);
    if(!oldUser){
        return next(createError(400,"User not Exists!!"));
    }
    try{
        const verify=jwt.verify(token,process.env.JWT_KEY);
        
    }catch(err){
        next(err);
    }
}
const ResetPassword=async(req,res,next)=>{
    const {id,token}=req.params;
    const oldUser=await User.findById(id);
    if(!oldUser){
        return next(createError(400,"User not Exists!!"));
    }
    try{
        const verify=jwt.verify(token,process.env.JWT_KEY);
       const newPasword=CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY);
       const updatePassword=await User.findByIdAndUpdate(id,{$set:{password:newPasword}});
      
    }catch(err){
        next(err);
    }
}
module.exports={login,register,fotgotPassword,ResetPassword,requestResetPassword}