const jwt = require("jsonwebtoken");

const isUserAuthorization = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
};


module.exports = {
  isUserAuthorization,
};
