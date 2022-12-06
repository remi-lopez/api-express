const jwt = require("jsonwebtoken");
require('dotenv').config()

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id, 
      email: user.email
    }, 
    process.env.SECRET, 
    {
      expiresIn: '3 hours'
    }
  )
  return token
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};

module.exports = {
  generateToken,
  verifyToken
}