const { createError } = require('../utils/createError')
const Message = require('../models/message')
const User = require('../models/user')
const mongoose = require('mongoose')

// get latest messages

const getLastestMessages = async (req, res, next) => {
  const userId = req.user.id

  try {
    const messages = await Message.find({
      $or: [{ from: userId }, { to: userId }],
      isLastMessage: true,
    })
      .sort('-createdAt')
      .populate({
        path: 'from',
        select: 'profileImage username createdAt',
      })
      .populate({
        path: 'to',
        select: 'profileImage username createdAt',
      })

    res
      .status(200)
      .json({ status: 'success', result: messages.length, data: messages })
  } catch (err) {
    next(err)
  }
}

// Create new message
const createMessage = async (req, res, next) => {
  const from = req.user.id
  const { to, content } = req.body

  try {
    const receiver = await User.findById(to).select(
      'username profileImage createdAt'
    )

    if (!receiver) {
      return next(createError(400, 'The receiver with that id no longer exist'))
    }

    const newMessage = await Message.create({ from, to, content })
    const data = await Message.findById(newMessage._id)
      .populate({ path: 'from', select: 'username profileImage' })
      .populate({ path: 'to', select: 'username profileImage' })

    // remove isLastMessage from previous message
    await Message.findOneAndUpdate(
      {
        $or: [
          { from, to },
          { from: to, to: from },
        ],
        _id: { $ne: newMessage._id },
        isLastMessage: true,
      },
      { isLastMessage: false }
    )
    // send notification to receiver
    await User.findByIdAndUpdate(to, { $inc: { notifications: 1 } })

    res.status(201).json({
      status: 'success',
      data,
    })
  } catch (err) {
    next(err)
  }
}

// get all messages between logged in user and specific user
const getAllMessages = async (req, res, next) => {
  const from = req.user.id
  const to = req.query.receiverId

  if (!to) {
    return next(createError(400, 'Please provide receiver Id'))
  }

  // clear notification
  await Message.updateMany(
    { from: to, to: from, isRead: false },
    { isRead: true }
  )

  const page = +req.query.page - 1 || 0
  const pageSize = req.query.pageSize || 15
  const skipNum = page * pageSize

  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    })
      .sort('-createdAt')
      .skip(skipNum)
      .limit(pageSize)

    res.status(200).json({
      status: 'success',
      result: messages.length,
      data: messages,
    })
  } catch (err) {
    next(err)
  }
}

const deleteMessage = async () => {}

const messageController = {
  createMessage,
  deleteMessage,
  getAllMessages,
  getLastestMessages,
}

module.exports = messageController
