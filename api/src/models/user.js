
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
   
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    firstName:String,
    lastName:String,
    gender:String,
    dateOfBirth:{
        type:Date,
        default:new Date()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    },
    savedPosts:[{type:mongoose.Schema.Types.ObjectId,ref:"post"}],  
    profileImage:{
        type:String,
        default:"https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png"
    }
}, {timestamps:true}
);
module.exports=mongoose.model("User",userSchema);