const express = require('express');
const router = express.Router();
const { auth,register } = require('../../../../controller/auth.controller');

router.post('/login', auth)
router.post('/register', register) 


router.get('/auth', (req, res) => {
    res.send('auth');
  });
  
module.exports = router;