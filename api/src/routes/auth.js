const express = require('express')
const { verifyToken } = require('../utils/verify')

const {
  login,
  register,
  fotgotPassword,
  checkToken,
  ResetPassword,
  isJwtTokenValid,
  resendEmail,
  checkLinkResetPassword,
} = require('../controllers/auth')
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/checkJWT', verifyToken, isJwtTokenValid)
router.post('/forgot-password', fotgotPassword)
router.post('/reset-password/:id/:token', ResetPassword)
router.get('/verify/:id/:token', checkToken)
router.post('/resendEmail/:id', resendEmail)
router.get('/checkLink-forgot/:id/:token', checkLinkResetPassword)
module.exports = router
