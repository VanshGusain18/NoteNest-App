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
    body("tittle", "minimum length of tittle is 3").isLength({ min: 3 }),
    body("description", "minimum length of description is 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { tittle, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = Note({
        tittle,
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

module.exports = router;
