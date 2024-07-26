const express = require('express');
const router = express.Router();
const {create,getAll,getById,getByUserId} = require ('../../../../controller/bank_account.controller')

router.post('/account', create);
router.get('/accounts', getAll);
router.get('/account/:accountId', getById);
router.get('/account/user/:userId', getByUserId);

module.exports = router;