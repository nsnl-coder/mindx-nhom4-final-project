const Notify = require('../models/notify')

const getAllNotify = async (req, res, next) => {
  const { page = 1, pageSize = 10, notifyType } = req.query

  const skip = (page - 1) * pageSize
  const query = { notifyTo: req.user.id }

  if (notifyType) query.notifyType = notifyType

  console.log(query)

  try {
    const notify = await Notify.find(query).skip(skip).limit(pageSize)

    res.status(200).json({
      message: 'success',
      result: notify.length,
      data: notify,
    })
  } catch (err) {
    next(err)
  }
}

const notifyController = { getAllNotify }
module.exports = notifyController
