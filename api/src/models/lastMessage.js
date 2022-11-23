const mongoose = require('mongoose')
const lastMessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('lastMessage', lastMessageSchema)
