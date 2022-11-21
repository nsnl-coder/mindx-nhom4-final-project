const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: String,
    lastName: String,
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
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    profileImage: {
      type: String,
      default:
        "https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
