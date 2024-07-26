const express = require('express');
const router = express.Router();
require('dotenv').config();
const V1_ROUTER = require('./api');

router.get('/', (req, res) => {
  res.json({
    title: 'Home Page'
  });
});

router.use('/api', V1_ROUTER);

module.exports = router;
