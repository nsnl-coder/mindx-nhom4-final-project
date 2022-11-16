const Message =require('../models/message');
const Post=require('../models/post');
//create 
const addMessage=async (req,res,next)=>{
    try{
        const savedMessage=await Message.findByIdAndUpdate(req.params.postId,{$push:{messages:req.body}},{new:true});
        res.status(200).json(savedMessage);
    }catch(err){
       next(err);
    }
}
//update
const UpdateMessage=async (req,res,next)=>{
    try{
        const updateMessage=await Message.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateMessage);
    }catch(err){
       next(err);
    }
}
//getAll
const GetsMessage=async (req,res,next)=>{
    try{
        const getMessages=await Message.findById(req.params.postId);
        res.status(200).json(getMessages);
    }catch(err){
       next(err);
    }
}


//delete
// const DeleteMessage=async (req,res)=>{
//     try{
//         await Post.findByIdAndRemove(req.params.id);
//         res.status(200).json('deleted');
//     }catch(err){
//         res.status(404).json(err);
//     }
// }
module.exports={addMessage,UpdateMessage,GetsMessage}
