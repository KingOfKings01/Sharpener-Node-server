const express = require('express');
const { getSuccess } = require('../controllers/contact');

const router = express.Router();

router.get('/success', getSuccess);

module.exports = router;
