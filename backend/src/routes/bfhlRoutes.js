const express = require('express');
const router = express.Router();
const bfhlController = require('../controllers/bfhlController');

router.get('/', bfhlController.handleGetRequest);
router.post('/', bfhlController.handlePostRequest);

module.exports = router;
