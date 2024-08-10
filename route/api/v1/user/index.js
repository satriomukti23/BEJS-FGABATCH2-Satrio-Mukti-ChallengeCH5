const express = require('express');
const router = express.Router();
const {create,getAll,getById} = require('../../../../controller/user.controller');
// const {auth} = require('../../../../controller/auth.controller');

router.post('/user', create);
router.get('/users', getAll);
router.get('/user/:userId', getById);

// router.post('/user/login', auth)


router.get('/', (req, res) => {
    res.send('user');
  });

module.exports = router;