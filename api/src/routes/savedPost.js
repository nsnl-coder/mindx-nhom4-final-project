const express=require('express');
const {addSavedPosts,getSavedPosts} =require('../controllers/savePost');
const {verifyAdmin,verifyUser,vertifyToken}=require('../utils/vertify');
const router=express.Router();
router.get('/:id',verifyUser,getSavedPosts);
router.post('/:id',verifyUser,addSavedPosts);
module.exports=router;