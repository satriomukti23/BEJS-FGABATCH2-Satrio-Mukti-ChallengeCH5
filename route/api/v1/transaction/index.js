const express = require('express');
const router = express.Router();
const {create,getAll,getById} = require('../../../../controller/transaction.controller');

router.post('/transaction', create);
router.get('/transactions', getAll);
// router.get('/transaction/:id', getById);
router.get('/transaction/:transactionId', getById);

module.exports = router;