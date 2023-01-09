const express = require("express");
const router = express.Router();
const { validateComment, Comment } = require("../models/comments");
const auth = require("../middlewares/auth");

// === Get all comments === //
router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.status(200).send(comments);
});

// === Add new comment (Private) === //
router.post("/", async (req, res) => {
    console.log(req.body);
  const { error } = validateComment(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let comment = new Comment({
    name: req.body.name,
    body: req.body.body,
  });
  comment = await comment.save();
  res.status(200).send(comment);
});

module.exports = router;
