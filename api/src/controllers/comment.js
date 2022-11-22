const mongoose = require('mongoose')
const Comment = require('../models/comment')
const Post = require('../models/post')

//create
const addComment = async (req, res, next) => {
  try {
    req.body.authorId = req.user.id
    const newComment = new Comment(req.body)
    const savedComment = await newComment.save()
    const populatedComment = await Comment.findById(savedComment._id).populate({
      path: 'authorId',
      select: 'username profileImage createdAt',
    })

    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: newComment._id },
    })
    res.status(200).json(populatedComment)
  } catch (err) {
    next(err)
  }
}
//update
const UpdateComment = async (req, res, next) => {
  try {
    const updateMessage = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateMessage)
  } catch (err) {
    next(err)
  }
}
module.exports = { addComment }
