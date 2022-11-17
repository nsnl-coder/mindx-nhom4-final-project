const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const CryptoJS=require('crypto-js');
const nodemailer=require('nodemailer');
const sendEmail=require('../utils/sendEmail');
const User=require('../models/user');
const SavedPosts=require('../models/savedPost');
const {createError}=require('../utils/createError');

const register=async(req,res,next)=>{
    
    try{  
        let user = await User.findOne({ email: req.body.email });
        if(user) return next(createError(409,"User with given email already Exist!"))
         const addSavedPost=new SavedPosts({_id:new mongoose.Types.ObjectId()});
         await addSavedPost.save();
        const newUser=new User(
            {email:req.body.email,
            userName:req.body.userName,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY).toString(),savedPosts:addSavedPost._id});
       
        const userSaved=await newUser.save();
        const {password,...details}=userSaved._doc;
        const token_access=jwt.sign({id:userSaved._id,userName:userSaved.userName},process.env.JWT_KEY,{expiresIn:"3d"});
        const url=`http://localhost:3000/users/${userSaved._id}/verify/${token_access}`
        await sendEmail(userSaved.email,"Verify Email",url);
        res.status(200).json("An Email sent to your account please verify");
    }catch(err){
        next(err);
    }
}
const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return next(createError(400,"Email not valid!"));
        }
      
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.CRYPTOJS_KEY).toString(CryptoJS.enc.Utf8)
        if(hashedPassword!==req.body.password){
            return next(createError(400,"Incorrect password!"));
        }
        if(!user.verified){
            const token=jwt.sign({id:user._id,userName:user.userName},process.env.JWT_KEY,{expiresIn:"4d"});
            const url=`http://localhost:3000/users/${userSaved._id}/verify/${token_access}`
            await sendEmail(userSaved.email,"Verify Email",url);
            return next(400,"An Email sent to your account please verify");
        }
        const {password,...details}=user._doc;
        const token_access=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:"4d"});
        res.status(200).json({...details,token_access});
    }catch(err){
        next(err);
    }
}
//Send email to recover password
const fotgotPassword=async(req,res,next)=>{
    const {email}=req.body;
    try{
        const oldUser=await User.findOne({email});
        if(!oldUser){
            return next(createError(400,"Email not valid"));
        }
        const token=jwt.sign({password:oldUser.password,id:oldUser._id},process.env.JWT_KEY,{expiresIn:"5m"});
        const link = `http://localhost:5000/api/auth/reset-password/${oldUser._id}/${token}`;
        await sendEmail(email,"Reset Password",link);
       res.status(200).json('Email Successfully')
    }catch(err){
        next(err);
    }
}
//Check token mail
const checkToken=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user) return next(createError(400,"Invalid link"));
        jwt.verify(req.params.token,process.env.JWT_KEY,async(err,userVerify)=>{
            if(err) return next(createError(401,"Token is not valid!"));
            const token=await User.findOne({_id:userVerify.id,userName:userVerify.userName});
            if(!token) return next(createError(400,"Invalid link"));
            await User.findByIdAndUpdate(user._id,{verified:true});
        });
        res.status(200).json("Email verified successfully");
    }catch(err){
        next(err);
    }
}
//ResetPassword
const ResetPassword=async(req,res,next)=>{
    const {id,token}=req.params;
    try{
        
    const oldUser=await User.findById(id);
    if(!oldUser){
        return next(createError(400,"User not Exists!!"));
    }
          jwt.verify(token,process.env.JWT_KEY,async(err,userVerify)=>{
            if(err) return next(createError(401,"Token is not valid!"));
            const token=await User.findOne({_id:userVerify.id,password:userVerify.password});
            if(!token) return next(createError(400,"Invalid link"));
        })
         const newPasword= CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOJS_KEY).toString();
       await User.findByIdAndUpdate(id,{$set:{password:newPasword}});
       res.status(200).json("Successfully") 
    }catch(err){
        next(err);
    }
}
module.exports={login,register,fotgotPassword,checkToken,ResetPassword}