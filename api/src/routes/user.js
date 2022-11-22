const express = require('express')

const {
  getMe,
  changePassword,
  addSavedPosts,
  UpdateUser,
  getStrangerUser,
  deleteUser,
  getAllUser,
} = require('../controllers/user')

const { verifyUser, vertifyToken } = require('../utils/vertify')
const router = express.Router()
router.get('/getMe', vertifyToken, getMe)
router.put('/change-password/:id', verifyUser, changePassword)
router.put('/save-post/:id', verifyUser, addSavedPosts)
router.put('/updateUser/:id', verifyUser, UpdateUser)
router.get('/strangerUser/:id', getStrangerUser)
router.delete('/delete/:id', deleteUser)
router.get('/', getAllUser)
router
module.exports = router
