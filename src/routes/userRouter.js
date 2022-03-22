const express = require('express')
const userCtr = require('../controllers/userController')
const auth = require('../middleware/auth')

const router = express.Router()

// user
router.get('/users', userCtr.getUsers)
router.get('/users/getInfor', auth, userCtr.getInfor)


router.put('/users/:id', userCtr.updateUser)


// user cart


module.exports =  router;