const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema(
    {
      _id:mongoose.Schema.Types.ObjectId,
       messages:[
        {
            userId:{
                type:String,
              
            },
            img:{
                type:String,
                
                        
            },
            userName:{
                type:String,
              
            },
            message:{
                type:String,
               
            },
            createAt:{
                type:Date,
                default:new Date(),
            }
        },
       
       ]
        
        
    },
    {timestamps:true}
);
module.exports=mongoose.model('Message',messageSchema);