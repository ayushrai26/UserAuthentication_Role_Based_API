const express = require('express')
const routes = express.Router()
const {getProfile} = require('../controllers/userController')
const authMiddleware = require('../middlewares.js/auth')


routes.get('/user-profile',authMiddleware,getProfile)

module.exports = routes
