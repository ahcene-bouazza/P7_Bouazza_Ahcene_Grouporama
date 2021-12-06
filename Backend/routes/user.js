const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/adminControl');


// Contre les attaques de force brute comme les password reset
const rateLimit = require("express-rate-limit");

const userController = require("../controllers/user");

// Configuration du plugin de sécurité rate limit
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes de test
    max: 5 // 5 essais maximum par adresse IP
  });

// Importation middleware de vérification du mot de passe
const verifyPassword = require("../middleware/verifyPassword");

// importation middleware vérification email
const verifyEmail = require("../middleware/emailValidator");

// Route POST pour l'inscription d'un utilisateur
router.post("/signup", verifyEmail, verifyPassword, userController.signup);

// Route POST pour la connexion d'un utilisateur
router.post("/login", limiter, userController.login);

// Route GET pour afficher tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Route GET pour afficher un user
router.get('/profile/:id', auth, userController.getOneUser);

// Route PUT pour modifier le pseudonyme d'un user
router.put('/profile/:id', auth, userController.updateOneUserPseudo);

// Route PUT pour modifier l'image d'un user
router.post('/profilPic/:id', auth, multer, userController.updateOneUserFile);

// Route DELETE pour supprimer un user
router.delete('/users/:id', auth, admin, userController.deactivateUser);


// exportation du fichier routes
module.exports = router;