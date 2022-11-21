const multer = require('multer')
const { createError } = require('../utils/createError')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/posts')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${Math.random()}-${Date.now()}.${ext}`)
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(createError('Not an image, please upload only images', 400), false)
  }
}

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

module.exports = uploadImage
