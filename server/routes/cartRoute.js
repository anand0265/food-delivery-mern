const express = require('express')
const { addtoCart, removeFromCart, getCart } = require('../controllers/cartController')
const router = express.Router()
const authMiddlewaaddtoCart = require('../middleware/auth')

//add to cart
router.post('/add',authMiddlewaaddtoCart, addtoCart)
// remove cart
router.post('/remove',authMiddlewaaddtoCart, removeFromCart)
// get cart
router.post('/get',authMiddlewaaddtoCart, getCart)

module.exports = router