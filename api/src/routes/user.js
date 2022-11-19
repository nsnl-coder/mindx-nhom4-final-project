const express = require("express");

const {
  getUser,
  changePassword,
  addSavedPosts,
  UpdateUser,
  getStrangerUser,
} = require("../controllers/user");
const { verifyUser } = require("../utils/vertify");
const router = express.Router();
router.get("/:id", verifyUser, getUser);
router.put("/change-password/:id", verifyUser, changePassword);
router.put("/save-post/:id", verifyUser, addSavedPosts);
router.put("/updateUser/:id", verifyUser, UpdateUser);
router.get("/strangerUser/:id", getStrangerUser);
module.exports = router;
