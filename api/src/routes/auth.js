const express = require('express');
const { verifyToken } = require('../utils/verify');
const passport = require('passport');

const {
  login,
  register,
  fotgotPassword,
  checkToken,
  ResetPassword,
  isJwtTokenValid,
  resendEmail,
  checkLinkResetPassword,
  googleLoginCallback,
  loginSuccess,
  googleLogout,
  signOut,
} = require('../controllers/auth');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/checkJWT', verifyToken, isJwtTokenValid);
router.post('/forgot-password', fotgotPassword);
router.post('/reset-password/:id/:token', ResetPassword);
router.get('/verify/:id/:token', checkToken);
router.post('/resendEmail/:id', resendEmail);
router.get('/checkLink-forgot/:id/:token', checkLinkResetPassword);
router.get('/login/success', loginSuccess);
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    session: false,
  }),
  googleLoginCallback
);

router.get('/logout', googleLogout);
router.get('/signout', signOut);

module.exports = router;
