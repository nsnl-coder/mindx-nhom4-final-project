const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

//
const postRoute = require('../routes/post')
const commentRoute = require('../routes/comment')
const authRoute = require('../routes/auth')
const userRoute = require('../routes/user')
const messageRoute = require('../routes/message')

const app = express()

const main = async () => {
  try {
    await mongoose.connect(process.env.MOGO_KEY)
    console.log('mongoose')
  } catch (err) {
    console.log(err)
  }
}
app.use(express.static(path.join(__dirname, '..', '..', 'public')))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)

app.use((err, req, res, next) => {
  console.log(err)
  const errStatus = err.status || 500
  const errMessage = err.message || 'something went wrong '
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    status: errStatus,
    stack: err.stack,
  })
})
const server = app.listen(5000, () => {
  console.log('App running on port 5000.')
  main()
})

module.exports = server
