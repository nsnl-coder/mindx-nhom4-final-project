const express = require('express')
const uploadImage = require('../utils/uploadImage')

const {
  CreatePost,
  DeletePost,
  GetPost,
  GetsPost,
  UpdatePost,
  GetUserNamePost,
  GetsSearchPost,
} = require('../controllers/post')

const { verifyUser, verifyToken, decodeToken } = require('../utils/verify')
const router = express.Router()

router.post('/', verifyToken, uploadImage.single('photo'), CreatePost)
router.put('/:id', verifyUser, UpdatePost)
router.delete('/:id/:postId', verifyUser, DeletePost)
router.get('/find/:id', decodeToken, GetPost)
router.get('/', GetsPost)
router.get('/name/:id', GetUserNamePost)
router.get('/search', GetsSearchPost)
module.exports = router
