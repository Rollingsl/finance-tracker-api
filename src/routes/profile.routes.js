const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getProfile, updateProfile, changePassword } = require('../controllers/profile.controller');

router.use(auth);

router.get('/', getProfile);
router.put('/', updateProfile);
router.put('/password', changePassword);

module.exports = router;