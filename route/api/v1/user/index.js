const express = require('express');
const router = express.Router();
const {create,getAll,getById} = require('../../../../controller/user.controller');

router.post('/user', create);
router.get('/users', getAll);
router.get('/user/:userId', getById);


router.get('/', (req, res) => {
    res.send('user');
  });

module.exports = router;