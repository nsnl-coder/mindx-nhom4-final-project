const mongoose = require('mongoose')
const formatPhotoName = require('../utils/formatPhotoName')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    selectFile: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    saveFileCount: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      required: true,
    },
    savedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    content: String,
  },
  { timestamps: true }
)

postSchema.post(/^find/, (docs) => {
  if (Array.isArray(docs)) {
    for (let i = 0; i < docs.length; i++) {
      docs[i].photo = formatPhotoName(docs[i].photo)
    }
  } else {
    if (docs) {
      docs.photo = formatPhotoName(docs.photo)
    }
  }
})

module.exports = mongoose.model('Post', postSchema)
