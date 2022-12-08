const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const nodemailer = require('nodemailer')
const sendEmail = require('../utils/sendEmail')
const User = require('../models/user')
const Token = require('../models/token')
const passport = require('passport')
const { createError } = require('../utils/createError')

const signJwtToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

const isJwtTokenValid = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      'username profileImage'
    )
    user.token = req.token
    res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
}

const signOut = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    domain: process.env.BACKEND_DOMAIN,
    sameSite: 'None',
  })

  res.status(204).send({ status: 'success', message: 'You have been sign out' })
}

const register = async (req, res, next) => {
  try {
    const { username, email } = req.body
    if (!username || !email || !req.body.password) {
      return next(
        createError(400, 'username or email or password are required')
      )
    }
    let checkUser = await User.findOne({
      username: req.body.username,
      googleId: null,
    })
    if (checkUser)
      return next(createError(409, 'User with given username already Exist!'))
    const checkEmail = await User.findOne({
      email: req.body.email,
      googleId: null,
    })
    if (checkEmail)
      return next(createError(409, 'User with given email already Exist!'))

    const newUser = new User(req.body)
    const userSaved = await newUser.save()
    const updatePassword = await User.findByIdAndUpdate(
      newUser._id,
      {
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTOJS_KEY
        ).toString(),
      },
      { new: true }
    )
    const { password, ...details } = updatePassword._doc
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save()
    const url = `${process.env.FRONTEND_HOST}/auth/verified/${userSaved._id}/${token.token}`
    await sendEmail(
      userSaved.email,
      userSaved.username,
      'Verify Email',
      "We've received signUp request",
      url,
      'To verify your account, click the link below:'
    )
    res.status(200).json({ email: newUser.email, _id: newUser._id })
  } catch (err) {
    next(err)
  }
}
const login = async (req, res, next) => {
  try {
    if (!req.body?.googleId) {
      const user = await User.findOne({
        email: req.body?.email,
        googleId: null,
      })
      if (!user) {
        return next(createError(400, 'Email is not registered!'))
      }
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTOJS_KEY
      ).toString(CryptoJS.enc.Utf8)
      if (hashedPassword !== req.body.password) {
        return next(createError(400, 'Incorrect password!'))
      }
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id })
        if (!token) {
          token = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save()
        }
        const url = `${process.env.FRONTEND_HOST}/auth/verified/${user._id}/${token.token}`
        await sendEmail(
          user.email,
          user.username,
          'Verify Email',
          "We've received signUp request",
          url,
          'To verify your account, click the link below:'
        )
        return res
          .status(200)
          .json({ id: user._id, email: user.email, verified: user.verified })
      }
      const { password, ...details } = user._doc
      const token_access = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY,
        { expiresIn: '4d' }
      )
      res.status(200).json({ ...details, token_access })
    } else {
      let user
      user = await User.findOne({ googleId: req.body?.googleId })
      if (!user) {
        user = await new User(req.body).save()
      }
      const token_access = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY,
        { expiresIn: '4d' }
      )
      const { googleId, ...details } = user._doc

      res.status(200).json({ ...details, token_access })
    }
  } catch (err) {
    next(err)
  }
}
//Send email to recover password
const fotgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const oldUser = await User.findOne({ email, googleId: null })
    if (!oldUser) {
      return next(createError(400, 'Email not valid'))
    }
    let token = await Token.findOne({ userId: oldUser._id })
    if (!token) {
      token = await new Token({
        userId: oldUser._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }
    const link = `${process.env.FRONTEND_HOST}/auth/newPass/${oldUser._id}/${token.token}`
    await sendEmail(
      email,
      oldUser.username,
      'Password Change Request',
      "We've received a password change request",
      link,
      'To change your password, click the link below:'
    )
    res.status(200).json('Email Successfully')
  } catch (err) {
    next(err)
  }
}
//resend Email
const resendEmail = async (req, res, next) => {
  try {
    const token = await Token.findOne({ userId: req.params.id }).populate(
      'userId'
    )
    if (!token) {
      return next(createError(400, 'User with given email already Exist!'))
    }
    const url = `${process.env.FRONTEND_HOST}/auth/verified/${req.params.id}/${token.token}`
    await sendEmail(
      token.userId.email,
      token.userId.username,
      'Verify Email',
      "We've received signUp request",
      url,
      'To verify your account, click the link below:'
    )
    res.status(200).json('An Email sent to your account please verify')
  } catch (err) {
    next(err)
  }
}
//Check token mail
const checkToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(createError(400, 'Invalid link'))

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!token) return next(createError(400, 'Invalid link!!'))
    await User.findByIdAndUpdate(user._id, { verified: true })
    res.status(200).json('Email verified successfully')
    await token.remove()
  } catch (err) {
    next(err)
  }
}
// verify password reset link
const checkLinkResetPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(createError(400, 'Invalid link'))

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })

    if (!token) return next(createError(400, 'Invalid link!!'))
    await User.findByIdAndUpdate(user._id, { verified: true })
    res.status(200).json('Email verified successfully')
  } catch (err) {
    next(err)
  }
}
//ResetPassword
const ResetPassword = async (req, res, next) => {
  const { id, token } = req.params
  try {
    const oldUser = await User.findById(id)
    if (!oldUser) {
      return next(createError(400, 'User not Exists!!'))
    }
    const checkToken = await Token.findOne({ userId: id, token: token })
    if (!checkToken) {
      return next(createError(400, 'User not Exists!!'))
    }
    const newPasword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTOJS_KEY
    ).toString()
    const newUser = await User.findByIdAndUpdate(
      id,
      { $set: { password: newPasword } },
      { new: true }
    )
    const { password, ...details } = newUser._doc
    const token_access = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    )
    await checkToken.remove()
    res.status(200).json({ ...details, token_access })
  } catch (err) {
    next(err)
  }
}

const googleLogin = passport.authenticate('google', ['profile', 'email'])

const googleLoginCallback = (req, res, next) => {
  // sendback cookie
  res.cookie('jwt', signJwtToken(req.user._id), {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    domain: process.env.BACKEND_DOMAIN,
    sameSite: 'None',
  })
  res.status(200).redirect(process.env.FRONTEND_HOST)
}

const loginSuccess = async (req, res) => {
  const ggUser = req?.user?._json
  const date = new Date().getTime()
  if (req?.user) {
    res.status(200).json({
      googleId: ggUser.sub,
      firstName: ggUser.family_name,
      lastName: ggUser.given_name,
      verified: ggUser.email_verified,
      profileImage: ggUser.picture,
      email: ggUser.email,
      username: `user-${date}`,
    })
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' })
  }
}

const googleLogout = (req, res) => {
  req.logout()
  res.redirect(`${process.env.FRONTEND_HOST}`)
}
module.exports = {
  login,
  register,
  fotgotPassword,
  checkToken,
  ResetPassword,
  isJwtTokenValid,
  resendEmail,
  checkLinkResetPassword,
  googleLogin,
  googleLoginCallback,
  loginSuccess,
  googleLogout,
  signOut,
}
