// const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authentication-token");
  const decode = jwt.decode(token);
  req.user = decode.Username;
  next();
};
