const mongoose = require("mongoose");
const Comment = require("../models/comment");
const Post = require("../models/post");

//create
const addComment = async (req, res, next) => {
  try {
    const newMessage = new Comment(req.body);
    const savedComment = await newMessage.save();
    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: newMessage._id },
    });
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};
//update
const UpdateComment = async (req, res, next) => {
  try {
    const updateMessage = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateMessage);
  } catch (err) {
    next(err);
  }
};
module.exports = { addComment };
