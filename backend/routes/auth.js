const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Create a User using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "minimum length of name is 3").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "minimum length of password is 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return errors and bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the same email already exists.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ user });
    } catch (error) {
      // Catch errors.
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
