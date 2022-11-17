const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
        
        title:{
            type:String,
          
        },
        comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]
        ,
        author:{
           type:mongoose.Schema.Types.ObjectId,ref:"User"
        }, 
        selectFile:{
            type:String,
            required:true
        },
        likeCount:{
            type:Number,
            default:0,
        },
        saveFileCount:{
            type:Number,
            default:0,
        },
        photo:{
            type:String
        },
        savedUsers:{
            type:mongoose.Schema.Types.ObjectId,ref:"User"
        },
        content:String
        
    },
    {timestamps:true}
);
module.exports=mongoose.model('Post',postSchema);