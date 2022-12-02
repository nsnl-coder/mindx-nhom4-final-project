const mongoose = require('mongoose');
const formatPhotoName = require('../utils/formatPhotoName');
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      // unique: true,
      // match: [/^[a-zA-Z0-9]+$/, 'Please provide a valid username'],
    },
    email: {
      type: String,
      unique: false,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      minLength: 8,
    },
    googleId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: String,
    dateOfBirth: {
      type: Date,
      default: new Date(),
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    userPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    profileImage: {
      type: String,
      default:
        'https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png',
    },
    notifications: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.post(/^find/, (docs) => {
  if (Array.isArray(docs)) {
    for (let i = 0; i < docs.length; i++) {
      docs[i].profileImage = formatPhotoName(docs[i].profileImage);
    }
  } else {
    if (docs) {
      docs.profileImage = formatPhotoName(docs.profileImage);
    }
  }
});

module.exports = mongoose.model('User', userSchema);
