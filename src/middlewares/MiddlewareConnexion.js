const verifyToken = require('./AuthenticateJWT');
const { Request, Response } = require('jsonwebtoken');

const authMiddleware = () => {
  const auth = Request.headers.authorization;
  console.log(auth);
  
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      console.log(tokenData);
      req.body.tokenData = tokenData;
    } catch (error) {
      res.status(404).send({
        message: 'No credentials'
      });
    }
  } else {
    res.status(404).send({
      message: 'No credentials'
    });
  }
};

module.exports = {
  authMiddleware
}