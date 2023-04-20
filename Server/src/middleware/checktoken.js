import jwt from "jsonwebtoken";
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    console.log(err);
    console.log(decoded); // bar
  });
};

module.exports = {
  authenticateToken: authenticateToken,
};
