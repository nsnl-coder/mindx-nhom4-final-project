const express = require('express')
const { addComment } = require('../controllers/comment')
const { verifyToken } = require('../utils/verify')
const router = express.Router()
router.post('/:postId', verifyToken, addComment)

module.exports = router
