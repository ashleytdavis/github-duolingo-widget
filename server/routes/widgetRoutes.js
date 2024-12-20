const express = require('express');
const widgetController = require('../controllers/widgetController');

const router = express.Router();

router.get('/duolingo-badge', widgetController.generateWidget);

module.exports = router;
