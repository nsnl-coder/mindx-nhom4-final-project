const savedPosts=require('../models/savedPost');
const addSavedPosts=async(req,res,next)=>{
    try{
        const savedPost=await savedPosts.findByIdAndUpdate(req.params.id,{$push:req.body},{$new:true});
        res.status(200).json(savedPost);
    }catch(err){
        next(err);
    }
}
const getSavedPosts=async(req,res,next)=>{
    try{
        const posts=await savedPosts.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
       next(err); 
    }
}

module.exports={addSavedPosts,getSavedPosts}