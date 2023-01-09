const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/users");
const auth = require("../middlewares/auth");

router.post("/" ,async (req, res) => {
  const { error } = validLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const valiedpassword = await bcrypt.compare(req.body.password, user.password);
  if (valiedpassword) {
    // const token = user.generateJWT(user);
    const token = jwt.sign({ _id: user._id, name:user.name }, "codeyouwillneverknow");
    console.log(token);
    token ? res.json(token) : res.status(400).send("Invalid email or password");
  }
});

function validLogin(req) {
  const schema = {
    email: Joi.string().required().min(4).max(255),
    password: Joi.string().required().min(3).max(1024),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
