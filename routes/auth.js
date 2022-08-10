const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router()

// Routes
router.post('/sign-up', authController.signUp)
router.post('/login', authController.Login)

module.exports = router