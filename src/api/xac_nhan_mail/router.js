const express = require('express')
const router = express.Router()
const emailController = require('./index')

let initRoutes = (app) => {
  router.post('/send-email', emailController.sendMail)
  return app.use('/', router)
};

module.exports = initRoutes