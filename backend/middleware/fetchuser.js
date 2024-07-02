var jwt = require("jsonwebtoken");
const JWT_SECRET = "vanshish3re";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to rq object

  try {
    const token = req.header("auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ error: "please authenticate using valid token" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "please authenticate using valid token" });
  }
};

module.exports = fetchuser;
