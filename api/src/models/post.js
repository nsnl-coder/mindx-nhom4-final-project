const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        message:{
            type:String,
            require:true
        },
        cretor:{
            type:String,
           
        },
        tags:{
            type:[String],
            require:true
        },
        selectFile:{
            type:String,
            require:true
        },
        likeCount:{
            type:Number,
            default:0,
        }
        
    },
    {timestamps:true}
);
module.exports=mongoose.model('Post',postSchema);