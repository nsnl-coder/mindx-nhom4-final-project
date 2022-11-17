const express=require('express');
const {CreatePost,DeletePost,GetPost,GetsPost,UpdatePost}=require('../controllers/post');
const {verifyAdmin,verifyUser,vertifyToken}=require('../utils/vertify');
const router=express.Router();

router.post('/',verifyUser,CreatePost);
router.put('/:id',verifyUser,UpdatePost);
router.delete('/:id',verifyUser,DeletePost);
router.get('/find/:id',GetPost);
router.get('/',GetsPost);
module.exports=router;