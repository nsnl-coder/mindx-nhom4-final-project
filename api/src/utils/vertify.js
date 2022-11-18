
const jwt=require('jsonwebtoken');
const {createError}=require('./createError');
const vertifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    if(!authHeader){
      return  next(createError(401,"You are not authencation"))
    }
    const token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err) return next(createError(401,"Token is not valid!"));
        req.user=user;
        next();
    });
}
const verifyUser=(req,res,next)=>{
    vertifyToken(req,res,()=>{
        if(req.user?.id!==req.params.id){
            return next(createError(401,"You are not authorized!"));
        }
        else{
            next();
        }
    })
}
const verifyAdmin=(req,res,next)=>{
    vertifyToken(req,res,()=>{
        if(!req.user?.isAdmin){
            return next(createError(401,"You are not Admin"))
        }else{
            next();
        }
    })
}
module.exports={verifyAdmin,verifyUser,vertifyToken}