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

    console.log({ from, to, content })

    const newMessage = await Message.create({ from, to, content })

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

    res.status(201).json({
      status: 'success',
      data: newMessage,
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

  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort('createdAt')

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
