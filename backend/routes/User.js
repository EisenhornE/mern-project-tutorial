const express = require('express')

// controller functions
const {LoginUser, SignUp} = require('../controllers/UserController')

const router = express.Router()

// login route
router.post('/login', LoginUser)

// sign-up route
router.post('/signup', SignUp)

module.exports = router