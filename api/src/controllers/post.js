const Post =require('../models/post');

//create 
const CreatePost=async (req,res)=>{
    try{
        const newPost=new Post(req.body);
        const post=await newPost.save();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);
    }
}
//update
const UpdatePost=async (req,res)=>{
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatePost);
    }catch(err){
        res.status(404).json(err);;
    }
}
//getAll
const GetsPost=async (req,res)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);;
    }
}
//get
const GetPost=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);;
    }
}
//delete
const DeletePost=async (req,res)=>{
    try{
        await Post.findByIdAndRemove(req.params.id);
        res.status(200).json('deleted');
    }catch(err){
        res.status(404).json(err);
    }
}
module.exports={GetPost,CreatePost,DeletePost,GetsPost,UpdatePost}
