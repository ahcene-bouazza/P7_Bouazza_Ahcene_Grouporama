const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/adminControl');
const commentControllers = require('../controllers/comments'); 

// CRUD
router.post('/', auth, commentControllers.createComment);
router.get('/:id', auth, commentControllers.getAllMessageComment);
router.delete('/:id', auth, admin, commentControllers.deleteComment);

module.exports = router;
