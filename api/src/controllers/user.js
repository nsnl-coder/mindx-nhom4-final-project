const User = require('../models/user')
const CryptoJS = require('crypto-js')
const { createError } = require('../utils/createError')
const Post = require('../models/post')
const { Types } = require('mongoose')
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('savedPosts')
      .populate('userPosts')
    const { password, ...details } = user._doc
    res.status(200).json(details)
  } catch (err) {
    next(err)
  }
}

// search by username or email address or firstname or lastname
const searchUsers = async (req, res, next) => {
  const { keyword, page = 1, pageSize = 20 } = req.query
  const skip = (+page - 1) * pageSize

  let query = {}

  if (keyword) {
    query = {
      $or: [
        { username: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
        { firstName: { $regex: keyword, $options: 'i' } },
        { lastName: { $regex: keyword, $options: 'i' } },
      ],
    }
  }

  try {
    const users = await User.aggregate([
      {
        $project: {
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          email: 1,
          userPosts: 1,
          username: 1,
          numberOfColors: {
            $cond: {
              if: { $isArray: '$userPosts' },
              then: { $size: '$userPosts' },
              else: 0,
            },
          },
        },
      },

      {
        $match: query,
      },
      { $sort: { numberOfColors: -1 } },
    ])
      .skip(skip)
      .limit(pageSize)
    const populate = await User.populate(users, { path: 'userPosts' })
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: populate,
    })
  } catch (err) {
    next(err)
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 })

    const { password, ...details } = user
    res.status(200).json(details)
  } catch {
    next(err)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    res.status(200).json('deleted')
  } catch (err) {
    next(err)
  }
}

const getUserBasicInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      'profileImage username'
    )
    res.status(200).json({ status: 'success', data: user })
  } catch (err) {
    next(err)
  }
}

const getStrangerUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('savedPosts')
      .populate('userPosts')
    const { password, email, isAdmin, verified, ...details } = user._doc
    res.status(200).json(details)
  } catch (err) {
    next(err)
  }
}
const UpdateUser = async (req, res, next) => {
  if (req.file) {
    req.body.profileImage = req.file.filename
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(createError(400, 'Email not valid!'))

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTOJS_KEY
    ).toString(CryptoJS.enc.Utf8)
    if (hashedPassword !== oldPassword)
      return next(createError(400, 'Incorrect password'))

    await User.findByIdAndUpdate(
      user._id,
      {
        password: CryptoJS.AES.encrypt(
          newPassword,
          process.env.CRYPTOJS_KEY
        ).toString(),
      },
      { new: true }
    )
    res.status(200).json('Password has been updated successfully!')
  } catch (err) {
    next(err)
  }
}
const addSavedPosts = async (req, res, next) => {
  try {
    const checkSavedPost = await User.findOne({
      _id: Types.ObjectId(req.params.id),
      savedPosts: { $in: Types.ObjectId(req.body.id) },
    })
    console.log(checkSavedPost)
    if (checkSavedPost) return res.status(400).json('ERROR')
    const savedPost = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { savedPosts: req.body.id } },
      { new: true }
    )
    await Post.findByIdAndUpdate(req.body.id, {
      $push: { savedUsers: req.params.id },
    })
    res.status(200).json(savedPost)
  } catch (err) {
    next(err)
  }
}
const removeSavedPost = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: Types.ObjectId(req.params.id),
        savedPosts: { $in: Types.ObjectId(req.body.id) },
      },
      { $pull: { savedPosts: Types.ObjectId(req.body.id) } }
    )
    await Post.findByIdAndUpdate(req.body.id, {
      $pull: { savedUsers: Types.ObjectId(req.params.id) },
    })
    res.status(200).json('Saved Post deleted successfully')
  } catch (err) {
    next(err)
  }
}
module.exports = {
  getUser,
  changePassword,
  addSavedPosts,
  UpdateUser,
  getStrangerUser,
  getUserBasicInfo,
  deleteUser,
  getAllUser,
  searchUsers,
  removeSavedPost,
}
