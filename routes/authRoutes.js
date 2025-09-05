const express = require('express')
const routes = express.Router()

const {createUser,loginUser, logoutUser,refreshToken, resetPassword} = require('../controllers/authController')

routes.post('/register-user',createUser)
routes.post('/login-user',loginUser)
routes.post('/refresh-token',refreshToken)
routes.post('/logout-user',logoutUser)
routes.post('/reset-password',resetPassword)

module.exports = routes