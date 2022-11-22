const Post = require('../models/post')
//create
const CreatePost = async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename
  }

  try {
    const newPost = new Post(req.body)
    const post = await newPost.save()
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
    const LIMIT = 10
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
const GetUserNamePost = async (req, res, next) => {
  const { page, userName } = req.query
  try {
    const LIMIT = 10
    const startIndex = (Number(page) - 1) * LIMIT
    const post = await Post.find()
      .sort('-createdAt')
      .limit(LIMIT)
      .skip(startIndex)
      .populate({
        path: 'author',
        match: {
          username: { $in: username },
        },
        select:
          'username firstName lastName gender createdAt profileImage _id dateOfBirth savedUsers',
      })
    const posts = post.reduce((total, num) => {
      if (num.author) {
        return [...total, num]
      } else {
        return total
      }
    }, [])
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
        populate: {
          path: 'authorId',
          select: 'username profileImage createdAt',
        },
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
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

//delete
const DeletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id)
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
}
