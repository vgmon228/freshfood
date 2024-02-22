const express = require('express')
const Controller = require('../controllers')
const router = express.Router()


// define the home page route
router.get('/register', Controller.getRegister)
router.post('/register',Controller.postRegister)
router.get('/login',Controller.getLogin)
router.post('/login',Controller.postLogin)
router.get('/home', Controller.getHome)
router.get('/product/add',Controller.getAddProduct)
router.post('/product/add',Controller.postAddProduct)
router.get("/product/edit")
router.get('/orders',Controller.getOrder)


module.exports = router