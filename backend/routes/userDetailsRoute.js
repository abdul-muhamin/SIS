// routes/userDetailsRoute.js
const express = require('express');
const { getUserDetails } = require('../controller/userDetailsController');
const router = express.Router();

router.get('/userdetails/:userId', getUserDetails);

module.exports = router;