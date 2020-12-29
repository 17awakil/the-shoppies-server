const express = require("express");
const router = express.Router();

const Nomination = require("../../models/Nomination");

/**
 * @route   GET /
 * @desc    Get all nominations
 * @access  Public
 */

router.get("/", (req, res) => {
  Nomination.find()
    .then((nominations) => res.json(nominations))
    .catch((e) => console.log(e));
});

/**
 * @route   POST api/nominations
 * @desc    Add a nomination
 * @access  Public
 */

router.post("/", async (req, res) => {
  try {
    const nomination = new Nomination({
      Title: req.body.Title,
      Year: req.body.Year,
      imdbID: req.body.imdbID,
      Poster: req.body.Poster,
    });

    var nominationExists = await Nomination.findOne({
      imdbID: req.body.imdbID,
    });
    if (nominationExists) throw Error("Movie already nominated");
    var numberOfNominations = await Nomination.count({});
    if (numberOfNominations === 5)
      throw Error("Five movies have already been nominated");
    nomination
      .save()
      .then((section) => res.json(section))
      .catch((e) => console.log(e));
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   DELETE api/nominations/:id
 * @desc    Remove a nomination
 * @access  Public
 */

router.delete("/:id", async (req, res) => {
  try {
    const nomination = await Nomination.findOne({ imdbID: req.params.id });
    if (!nomination) throw Error("No nomination found");

    const removed = await nomination.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the nomination");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
