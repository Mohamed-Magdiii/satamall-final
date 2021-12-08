const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require('../models/Users')
dotenv.config();
const verifytoken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "No token , authorized denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
const verifyAuthorization = (req, res, next) => {
  verifytoken(req, res, async () => {
    let user = await User.findById(req.user._id);
    if (req.user._id===req.params.id || user.role === "admin") {
      next();
    } else {
      res.status(401).json("You are not allowed to do that");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyAuthorization(req, res, async () => {
      let user = await User.findById(req.user._id);
      if (user.role === "admin") {
        next();
      } else {
        res.status(401).json("You are not allowed to do that");
      }
    });
  };
  

module.exports = { verifytoken, verifyAuthorization, verifyTokenAndAdmin };
