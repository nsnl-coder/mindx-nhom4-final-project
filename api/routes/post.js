const express=require('express');
const Post =require('../models/post');
const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        const newPost=new Post(req.body);
        const post=await newPost.save();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatePost);
    }catch(err){
        res.status(404).json(err);;
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const deletePost=await Post.findByIdAndRemove(req.params.id);
        res.status(200).json('deleted');
    }catch(err){
        res.status(404).json(err);
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);;
    }
})
router.get('/',async(req,res)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json(err);;
    }
})
module.exports=router;