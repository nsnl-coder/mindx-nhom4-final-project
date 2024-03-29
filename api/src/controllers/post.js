const Post = require('../models/post')
const Notify = require('../models/notify')
const User = require('../models/user')
//create
const CreatePost = async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename
  }

  const { title, photo, content } = req.body

  try {
    const newPost = new Post({ title, photo, content, author: req.user.id })
    const post = await newPost.save()
    await User.findByIdAndUpdate(req.user.id, {
      $push: { userPosts: newPost._id },
    })
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}
//update
const UpdatePost = async (req, res, next) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatePost)
  } catch (err) {
    next(err)
  }
}
//getAll
const GetsPost = async (req, res, next) => {
  const { page } = req.query
  try {
    const LIMIT = 20
    const startIndex = (Number(page) - 1) * LIMIT
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .populate({
        path: 'author',
        select:
          'username firstName lastName gender createdAt profileImage _id dateOfBirth savedUsers',
      })

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}
const GetsSearchPost = async (req, res, next) => {
  const { page, search } = req.query
  try {
    const LIMIT = 20
    const startIndex = (Number(page) - 1) * LIMIT
    const post = await Post.find({
      title: { $regex: '.*' + search + '.*', $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .populate({
        path: 'author',
        select:
          'username firstName lastName gender createdAt profileImage _id dateOfBirth savedUsers',
      })

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

const GetUserNamePost = async (req, res, next) => {
  const { page = 1 } = req.query
  try {
    const LIMIT = 30
    const startIndex = (Number(page) - 1) * LIMIT
    const post = await Post.find()
      .populate({
        path: 'author',
        match: {
          _id: { $in: req.params.id },
        },
        select:
          'username firstName lastName gender createdAt profileImage _id dateOfBirth savedUsers',
      })
      .sort('-createdAt')

    const posts = await post
      .reduce((total, num) => {
        if (num.author) {
          return [...total, num]
        } else {
          return total
        }
      }, [])
      .slice(startIndex, startIndex + LIMIT)

    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

//get

const GetPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: [
          {
            path: 'authorId',
            select: 'username profileImage createdAt',
          },
        ],

        options: {
          sort: '-createdAt',
        },
      })
      .populate({
        path: 'author',
        select: 'username profileImage',
      })
      .populate({
        path: 'savedUsers',
        select: 'username profileImage',
      })

    if (req.user && req.user.id === post.author._id.toString()) {
      // clear comment notify
      await Notify.updateMany(
        { notifyTo: post.author, postId: post._id, notifyType: 'new-comment' },
        { count: 0 }
      )
      // clear mention notify
      await Notify.updateMany(
        {
          notifyTo: req.user.id,
          postId: post._id,
          notifyType: 'new-mention',
        },
        { count: 0 }
      )
    }

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

//delete
const DeletePost = async (req, res, next) => {
  const { id, postId } = req.params
  try {
    await Post.findByIdAndDelete(postId)
    await User.findByIdAndUpdate(id, {
      $pull: { userPosts: postId },
    })
    res.status(200).json('deleted')
  } catch (err) {
    res.status(404).json(err)
  }
}
module.exports = {
  GetPost,
  CreatePost,
  DeletePost,
  GetsPost,
  UpdatePost,
  GetUserNamePost,
  GetsSearchPost,
}
