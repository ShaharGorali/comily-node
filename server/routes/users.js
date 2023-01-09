const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validateUser, User } = require("../models/users");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");
  user = new User(_.pick(req.body, ["email", "password", "name"]));
  console.log(user);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    user = await user.save();
    res
      .header("x-auth-token", user.generateJWT())
      .header("access-control-expose-headers", "x-auth-token")
      .send(user.name + " added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
