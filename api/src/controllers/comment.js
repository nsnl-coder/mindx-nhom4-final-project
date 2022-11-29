const ObjectId = require('mongoose').Types.ObjectId

//
const Comment = require('../models/comment')
const Notify = require('../models/notify')
const Post = require('../models/post')

//

const isValidObjectId = (id) => {
  console.log(id)
  const newObjectId = new ObjectId(id)

  if (id === newObjectId.toString()) return true
  return false
}

//create
const addComment = async (req, res, next) => {
  try {
    req.body.authorId = req.user.id
    req.body.mentions = []
    let notifyContent = req.body.content

    const splitArray = notifyContent.split(/(@\[[a-zA-Z ]+\]\([a-zA-Z0-9]+\))/g)
    splitArray.forEach((item) => {
      const id = item.match(/(?<=\()[a-zA-Z0-9]+(?=\))/g)
      if (id && isValidObjectId(id[0])) {
        req.body.mentions.push(id)

        const mentionName = '@' + item.match(/(?<=@\[)[a-zA-Z0-9 ]+(?=\])/g)
        notifyContent = notifyContent.replace(item, mentionName)
      }
    })

    const newComment = new Comment(req.body)

    const savedComment = await newComment.save()
    let populatedComment = await Comment.findById(savedComment._id).populate({
      path: 'authorId',
      select: 'username profileImage createdAt',
    })
    const post = await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: newComment._id },
    })

    if (req.user.id !== post.author) {
      // create notify: new-comment
      await Notify.create({
        notifyFrom: req.body.authorId,
        notifyTo: post.author,
        notifyType: 'new-comment',
        postId: req.params.postId,
        content: notifyContent.slice(0, 20) + '...',
        commentId: savedComment._id,
        count: 1,
      })
    }
    // create notify: new-mention
    if (newComment.mentions.length > 0) {
      await Notify.updateMany(
        {
          notifyFrom: newComment.authorId,
          notifyTo: { $in: newComment.mentions },
          notifyType: 'new-mention',
          postId: req.params.postId,
          content: notifyContent.slice(0, 20) + '...',
          commentId: savedComment._id,
        },
        {
          count: 1,
        },
        {
          upsert: true,
        }
      )
    }

    populatedComment = JSON.parse(JSON.stringify(populatedComment))
    populatedComment.postAuthor = post.author
    populatedComment.notifyContent = notifyContent
    populatedComment.postId = req.params.postId

    res.status(200).json(populatedComment)
  } catch (err) {
    next(err)
  }
}
//update
const UpdateComment = async (req, res, next) => {
  try {
    const updateMessage = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateMessage)
  } catch (err) {
    next(err)
  }
}
module.exports = { addComment }
