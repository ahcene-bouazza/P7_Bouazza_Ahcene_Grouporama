const emailValidator = require('email-validator');

module.exports = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)) {
        console.log('email invalide');
        res.status(400).json({error: 'email invalide!' });
    } else {
        next();
    }
};