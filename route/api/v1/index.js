const express = require('express');
const router = express.Router();
const {authJwt} = require('../../../middleware/authJwt')

const USER_ROUTER = require('./user');
const TRANSACTION_ROUTER = require('./transaction');
const BANK_ACCOUNT_ROUTER = require('./bank_account');
const PROFILE_ROUTER = require('./profile')
const AUTH_ROUTER = require('./auth')


router.use('/',  USER_ROUTER);
router.use('/',  TRANSACTION_ROUTER);
router.use('/',  BANK_ACCOUNT_ROUTER);
router.use('/',  PROFILE_ROUTER)
router.use('/', AUTH_ROUTER)

router.get('/', (req, res) => {
    res.send('V1');
  });

module.exports = router;