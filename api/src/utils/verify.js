const jwt = require('jsonwebtoken')
const { createError } = require('./createError')

// check if token is valid
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token

  if (!authHeader) {
    return next(createError(401, 'You are not authencation'))
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      console.log(err)
      return next(createError(401, 'Token is not valid!'))
    }
    req.user = user
    next()
  })
}
// dont limit user but want to know who user is
const decodeToken = (req, res, next) => {
  const authHeader = req.headers.token

  if (!authHeader) {
    return next()
  }
  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return next()
    }
    req.user = user
    next()
  })
}

// check if user authorize to edit other resource
const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err)

    if (req.user?.id !== req.params.id) {
      return next(createError(401, 'You are not authorized!'))
    } else {
      next()
    }
  })
}

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err)

    if (!req.user?.isAdmin) {
      return next(createError(401, 'You are not Admin'))
    } else {
      next()
    }
  })
}
module.exports = { verifyAdmin, verifyUser, verifyToken, decodeToken }
