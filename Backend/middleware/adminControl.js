const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extraction du token du header authorization
    const token = req.headers.authorization.split(' ')[1]; 
    // Décodage du token                   
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);         
    const role = decodedToken.isAdmin;
    // vérification s'il s'agit de l'administrateur
    if (role == 1){
        next()
    } else {
        return res.status(403).json({ message: 'Seul l\'administrateur est autorisé pour cette fonction'});
    }
};