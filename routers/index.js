const express = require('express')
const Controller = require('../controllers')
const router = express.Router()


// define the home page route
router.get('/register', Controller.getRegister)
router.post('/register',Controller.postRegister)
router.get('/login',Controller.getLogin)
router.post('/login',Controller.postLogin)
router.use(function (req, res, next) {
    if(!req.session.userid){
        res.redirect(`/login?error=${'Harus login dulu'}`)
    }else{
        next()
    }
})
router.get('/home', Controller.getHome)
router.get('/product/add',Controller.getAddProduct)
router.post('/product/add',Controller.postAddProduct)
router.get("/product/:productId/edit", Controller.showProductEdit)
router.post("/product/:productId/edit", Controller.postProductEdit)
router.get("/product/:productId/delete", Controller.delete)
router.get('/orders',Controller.getOrder)
router.get('/ordersdetail/:id',Controller.getOrderDetail)
router.get('/logout',Controller.getLogOut)


module.exports = router