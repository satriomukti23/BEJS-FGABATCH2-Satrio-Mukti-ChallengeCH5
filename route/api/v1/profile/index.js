const express = require('express');
const router = express.Router()
const {create,getAll,getById,getByUserId} = require('../../../../controller/profile.controller')

router.post('/profile',create);
router.get('/profiles',getAll),
router.get('/profile/:profileId',getById)
router.get('/profile/user/:userId',getByUserId)

module.exports = router