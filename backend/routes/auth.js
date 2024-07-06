const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "vanshish3re";
var fetchuser = require("../middleware/fetchuser");

//ROUTE1: Create a User using POST "/api/auth/createuser". No login required
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
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      // Catch errors.
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE2: Login a User using POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password can't be black").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      let compPassword = await bcrypt.compare(password, user.password);
      if (!compPassword) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE3: Get loggedin user details using POST "/api/auth/getuser". No login required
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
