const express = require("express");
const joi = require("joi");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const comment = require("./routes/comments");
const auth = require("./routes/auth");
const user = require("./routes/users");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/comly")
  .then(() => console.log("Connected to MongoDB database"))
  .catch((er) => console.log("Couldnt connect to MongoDB database"));
console.log(`this is the node env ${process.env.NODE_ENV}`);
console.log(app.get("env"));

app.use(cors());
app.use(express.json()); // convert json to javascript and javascript to json
if (app.get("env") === "development") app.use(morgan("tiny"));

// === Routes === //
app.use("/api/comments", comment);
app.use("/api/users", user);
app.use("/api/auth", auth);

// === PORT === //
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`active on ${port}`));
