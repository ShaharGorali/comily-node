const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    match: /.*@*./,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
});

schema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this.id }, "codeyouwillneverknow");
  return token;
};
const User = new mongoose.model("User", schema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(4).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  };
  return Joi.validate(user, schema);
}

module.exports.validateUser = validateUser;
module.exports.User = User;
