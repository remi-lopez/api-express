const jwt = require('jsonwebtoken');
require('dotenv').config()


/* 
  TOKEN :
  GENERATE A TOKEN FOR A VALID USER
*/
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

/* 
  TOKEN :
  VERIFY GIVEN TOKEN
*/
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};


module.exports = {
  generateToken,
  verifyToken
}