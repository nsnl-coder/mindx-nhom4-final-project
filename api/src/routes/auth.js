const express = require('express')
const { vertifyToken } = require('../utils/vertify')

const {
  login,
  register,
  fotgotPassword,
  checkToken,
  ResetPassword,
  isJwtTokenValid,
  resendEmail,
} = require('../controllers/auth')
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/checkJWT', vertifyToken, isJwtTokenValid)
router.post('/forgot-password', fotgotPassword)
router.post('/reset-password/:id/:token', ResetPassword)
router.get('/verify/:id/:token', checkToken)
router.post('/resendEmail/:id', resendEmail)
module.exports = router
