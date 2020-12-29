const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nominations = require("./routes/api/nominations");
const api = express();
// Bodyparser middleware
api.use(express.json());
api.use(cors());
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

api.use("/nominations", nominations);
api.get("/", (req, res) => {
  res.send("Welcome to my personal website API. Use api/nominations endpoint.");
});
exports.api = functions.https.onRequest(api);
