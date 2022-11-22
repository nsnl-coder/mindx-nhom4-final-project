const express = require('express')
const { addComment } = require('../controllers/comment')
const { verifyUser, vertifyToken } = require('../utils/vertify')
const router = express.Router()
router.post('/:id', vertifyToken, addComment)

module.exports = router
