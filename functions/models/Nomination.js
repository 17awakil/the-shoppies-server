const { Schema, model } = require("mongoose");

const NominationSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
});

const Nomination = model("nomination", NominationSchema);

module.exports = Nomination;
