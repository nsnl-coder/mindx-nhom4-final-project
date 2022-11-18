const express=require('express');
const {addComment}=require('../controllers/comment');
const {verifyUser} =require('../utils/vertify');
const router=express.Router();
router.post('/:id',verifyUser,addComment);

module.exports=router;