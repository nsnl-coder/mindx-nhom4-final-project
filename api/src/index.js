const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const postRoute=require('./routes/post');
dotenv.config();

const app =express();
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(cors());
app.use('/post',postRoute);
const main=async()=>{
    try{
        await mongoose.connect(process.env.MOGO_KEY);
        console.log('mongoose');
    }catch(err){
        console.log(err)
    }
}
app.listen(5000,()=>{
    console.log('connect');
    main();
})