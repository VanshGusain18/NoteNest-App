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
    // Check user with the same email exists already.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ user });
  }
);

module.exports = router;
