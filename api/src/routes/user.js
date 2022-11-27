const express = require('express')
const uploadImage = require('../utils/uploadImage')

const {
  getUser,
  changePassword,
  addSavedPosts,
  UpdateUser,
  getStrangerUser,
  deleteUser,
  getAllUser,
  getUserBasicInfo,
  searchUsers,
} = require('../controllers/user')

const { verifyUser } = require('../utils/verify')
const router = express.Router()

router.get('/search-users', searchUsers)

//
router.get('/find/:id', getUser)
router.put('/change-password/:id', verifyUser, changePassword)
router.put('/save-post/:id', verifyUser, addSavedPosts)

router.put(
  '/updateUser/:id',
  verifyUser,
  uploadImage.single('profileImage'),
  UpdateUser
)

router.get('/basic-info/:id', getUserBasicInfo)
router.get('/strangerUser/:id', getStrangerUser)
router.delete('/delete/:id', deleteUser)
router.get('/', getAllUser)

module.exports = router
