const express=require('express'); 

const {getUser,changePassword,addSavedPosts,UpdateUser}=require('../controllers/user');
const {verifyUser} =require('../utils/vertify');
const router=express.Router();
router.get('/:id',verifyUser,getUser);
router.put('/change-password/:id',verifyUser,changePassword);
router.put('/save-post/:id',verifyUser,addSavedPosts);
router.put('/updateUser/:id',verifyUser,UpdateUser);
module.exports=router