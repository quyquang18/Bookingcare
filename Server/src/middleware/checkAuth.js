import jwt from "jsonwebtoken";
require("dotenv").config();

const checkAuth = (req, res, next) => {
  const { user_role } = req.cookies;
  jwt.verify(user_role, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
    console.log(decoded); // bar
  });
  next();
};
module.exports = {
  checkAuth: checkAuth,
};
