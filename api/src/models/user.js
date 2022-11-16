
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
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
    isAdmin:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        default:"https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png"
    }
}, {timestamps:true}
);
module.exports=mongoose.model("User",userSchema);