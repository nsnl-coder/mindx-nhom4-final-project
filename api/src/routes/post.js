const express = require('express')
const uploadImage = require('../utils/uploadImage')

const {
  CreatePost,
  DeletePost,
  GetPost,
  GetsPost,
  UpdatePost,
  GetUserNamePost,
} = require('../controllers/post')

const { verifyUser, verifyToken } = require('../utils/verify')
const router = express.Router()

router.post('/', verifyToken, uploadImage.single('photo'), CreatePost)
router.put('/:id', verifyUser, UpdatePost)
router.delete('/:id', verifyUser, DeletePost)
router.get('/find/:id', GetPost)
router.get('/', GetsPost)
router.get('/name', GetUserNamePost)
module.exports = router
