// Package jsonwebtoken (authentification par token)
const jwt = require('jsonwebtoken');        

module.exports = (req, res, next) => {
  try {
    // Extraction du token du header authorization
    const token = req.headers.authorization.split(' ')[1]; 
    // Décodage du token                   
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);         
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Erreur lors de l\'authentification')
    });
  }
};