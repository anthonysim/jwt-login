const express = require('express');
const router = express.Router();
const { signUpUser, loginUser } = require('../controllers/controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/protected', verifyToken);


module.exports = router;