const express=require('express');
const {addMessage,GetsMessage,UpdateMessage}=require('../controllers/message')
const router=express.Router();
router.put('/:postId',addMessage);
// router.put('/',UpdateMessage);
router.get('/:postId',GetsMessage);
module.exports=router;