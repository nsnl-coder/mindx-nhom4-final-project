const mongoose = require('mongoose')

const notifySchema = mongoose.Schema(
  {
    notifyType: {
      type: String,
      enum: ['new-message', 'new-save', 'new-comment', 'new-mention'],
    },
    notifyFrom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    notifyTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    count: {
      type: Number,
      default: 1,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
)

const notifyModel = mongoose.model('notify', notifySchema)

module.exports = notifyModel
