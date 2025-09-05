const express = require('express')
const routes = express.Router()
const roleMiddleware = require('../middlewares.js/role')
const {fetchAllUsers,deleteUser} = require('../controllers/adminController')


routes.get('/fetch-all-users',roleMiddleware(["admin"]),fetchAllUsers)
routes.delete('/delete-user/:id',roleMiddleware(["admin"]),deleteUser)


module.exports = routes