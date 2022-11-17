const User=require('../models/user');
const CryptoJS=require('crypto-js');
const {createError} =require('../utils/createError');

const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...details}=user._doc;
        res.status(200).json(details);
    }catch(err){
        console.log(err);
    }
} 
const changePassword=async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    try{
        const user=await User.findById(req.params.id);
        if(!user) return next(createError(400,"Email not valid!"));
        
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.CRYPTOJS_KEY).toString(CryptoJS.enc.Utf8);
        if(hashedPassword!==oldPassword) return next(createError(400,"Incorrect password"));
      
       await User.findByIdAndUpdate(user._id,{password:CryptoJS.AES.encrypt(newPassword,process.env.CRYPTOJS_KEY).toString()},{new:true});
        res.status(200).json("Password has been updated successfully!");
    }catch(err){
        next(err);
    }
}
module.exports={getUser,changePassword}