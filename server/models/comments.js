const mongoose = require("mongoose");
const Joi = require("joi");

const Comment = new mongoose.model(
  "Comment",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlenght: 2,
      maxlength: 50,
    },
    body: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateComment(comment) {
  const schema = {
    name: Joi.string().required().min(2).max(50),
    body: Joi.string().required().min(3).max(100),
    date: Joi.date(),
  };
  return Joi.validate(comment, schema);
}

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
