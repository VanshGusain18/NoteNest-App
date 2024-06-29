const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Create a User using POST "/api/auth". Doesn't require Auth
router.post(
  "/",
  [
    body("name", "minimum length of name is 3").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "minimum length of password is 5").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({
          error: "please enter a unique email",
          message: err.message,
        });
      });
  }
);

module.exports = router;
