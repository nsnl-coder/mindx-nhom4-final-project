const express = require('express')
const { verifyToken } = require('../utils/verify')

const {
  login,
  register,
  fotgotPassword,
  checkToken,
  ResetPassword,
  isJwtTokenValid,
} = require('../controllers/auth')
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/checkJWT', verifyToken, isJwtTokenValid)
router.post('/forgot-password', fotgotPassword)
router.post('/reset-password/:id/:token', ResetPassword)
router.get('/:id/verify/:token', checkToken)

module.exports = router
