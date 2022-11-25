const express = require('express')
const notifyController = require('../controllers/notify')
const { verifyToken } = require('../utils/verify')

const router = express.Router()

router.use(verifyToken)
router.get('/', notifyController.getAllNotify)

module.exports = router
