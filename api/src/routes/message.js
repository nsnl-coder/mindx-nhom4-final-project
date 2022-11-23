const express = require('express')
const messageController = require('../controllers/message')
const { verifyToken } = require('../utils/verify')
const router = express.Router()

router.use(verifyToken)

router.get('/latest', messageController.getLastestMessages)

router
  .route('/')
  .post(messageController.createMessage)
  .get(messageController.getAllMessages)

router.route('/:messageId').delete(messageController.deleteMessage)

module.exports = router
