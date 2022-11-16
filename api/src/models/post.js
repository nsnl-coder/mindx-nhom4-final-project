const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
        title:{
            type:String,
          
        },
        message:[
            {type:mongoose.Schema.Types.ObjectId,ref:"Message"}
        ],
        cretor:{
            type:String,
           require:true
        }, 
        selectFile:{
            type:String,
            require:true
        },
        likeCount:{
            type:Number,
            default:0,
        },
        saveFileCount:{
            type:Number,
            default:0,
        }
        
        
    },
    {timestamps:true}
);
module.exports=mongoose.model('Post',postSchema);