const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/adminControl');
const messageControllers = require('../controllers/messages');

// CRUD
router.post('/', auth, multer, messageControllers.createMessage);
router.get('/', auth, messageControllers.getAllMessages);
router.get('/reactions', auth, messageControllers.getAllReactions);
router.post('/:id/reactions', auth, messageControllers.createReaction);
router.delete('/:id', auth, admin, messageControllers.deleteMessage);

module.exports = router;