const express=require('express');
const {CreatePost,DeletePost,GetPost,GetsPost,UpdatePost}=require('../controllers/post');
const router=express.Router();
router.post('/',CreatePost);
router.put('/:id',UpdatePost);
router.delete('/:id',DeletePost);
router.get('/find/:id',GetPost);
router.get('/',GetsPost);
module.exports=router;