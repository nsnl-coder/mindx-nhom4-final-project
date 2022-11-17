const mongoosse=require('mongoose');
const savedSchema=new mongoosse.Schema({
    _id: mongoosse.Schema.Types.ObjectId,
    posts:[
        {
        title:{
            type:String,
          
        },
        cretor:{
            type:String,
           
        }, 
        selectFile:{
            type:String,
            
        },
        likeCount:{
            type:Number,
            default:0,
        },
        saveFileCount:{
            type:Number,
            default:0,
        }
    }
    ]	
});
module.exports=mongoosse.model("SavedPosts",savedSchema);