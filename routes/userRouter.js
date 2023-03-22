const express = require('express');

const userController = require('../controllers/userController');
const { validateTokens } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/details', validateTokens, userController.getUserById);

module.exports = router;
