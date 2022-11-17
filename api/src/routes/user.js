const express=require('express'); 

const {getUser,changePassword}=require('../controllers/user');
const {verifyAdmin,verifyUser,vertifyToken} =require('../utils/vertify');
const router=express.Router();
router.get('/:id',verifyUser,getUser);
router.put('/change-password/:id',verifyUser,changePassword);
module.exports=router