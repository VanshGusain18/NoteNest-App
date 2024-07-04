const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//ROUTE1: Create a Note using POST "/api/notes/createnote". No login required
router.post(
  "/createnote",
  fetchuser,
  [
    body("title", "minimum length of title is 3").isLength({ min: 3 }),
    body("description", "minimum length of description is 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

//ROUTE2: get all notes using GET "/api/notes/getnotes". No login required
router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
