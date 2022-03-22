const express = require('express')
const authCtr = require('../controllers/authController')
const router = express.Router()

router.post('/register', authCtr.register)
router.post('/login', authCtr.login)

module.exports =  router;