const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema(
    {
        
        authorId:{
             type:mongoose.Schema.Types.ObjectId,ref:"User"
        },
        content:{
                type:String,
               
            },
    },
    {timestamps:true}
);
module.exports=mongoose.model('Comment',commentSchema);