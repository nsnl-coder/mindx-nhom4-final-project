const Post =require('../models/post');
const Message=require('../models/message');
const mongoose=require('mongoose');
//create 
const CreatePost=async (req,res,next)=>{
    try{
       
        const newMessage=new Message({_id:new mongoose.Types.ObjectId()});
        const message=await newMessage.save();
         const newPost=new Post({message:newMessage._id,...req.body});
        const post=await newPost.save();
        res.status(200).json(post);
    }catch(err){
       next(err);
    }
}
//update
const UpdatePost=async (req,res,next)=>{
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatePost);
    }catch(err){
       next(err);
    }
}
//getAll
const GetsPost=async (req,res,next)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(err){
       next(err);
    }
}
//get
const GetPost=async (req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id).populate('message');
        res.status(200).json(post);
    }catch(err){
       next(err);
    }
}
//delete
const DeletePost=async (req,res,next)=>{
    try{
        await Post.findByIdAndRemove(req.params.id);
        res.status(200).json('deleted');
    }catch(err){
        res.status(404).json(err);
    }
}
module.exports={GetPost,CreatePost,DeletePost,GetsPost,UpdatePost}
