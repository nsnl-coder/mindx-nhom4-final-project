const express = require("express");
const {
  CreatePost,
  DeletePost,
  GetPost,
  GetsPost,
  UpdatePost,
  GetUserNamePost,
} = require("../controllers/post");
const { verifyUser } = require("../utils/vertify");
const router = express.Router();

router.post("/", verifyUser, CreatePost);
router.put("/:id", verifyUser, UpdatePost);
router.delete("/:id", verifyUser, DeletePost);
router.get("/find/:id", GetPost);
router.get("/", GetsPost);
router.get("/name", GetUserNamePost);
module.exports = router;
