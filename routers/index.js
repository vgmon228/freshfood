const express = require('express')
const Controller = require('../controllers')
const router = express.Router()


// define the home page route
router.get('/', Controller.getRegister)
router.post('/',Controller.postRegister)
router.get('/login',Controller.getLogin)
router.post('/login',Controller.postLogin)
router.get('/home', Contoller.getHome)


module.exports = router