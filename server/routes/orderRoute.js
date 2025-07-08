 const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../controllers/orderController')


// order place   
router.post("/place",authMiddleware, placeOrder)
router.post("/verify",verifyOrder)
router.post("/userorders",authMiddleware,userOrders)
router.get("/list",listOrders)
router.post("/status",updateStatus)


module.exports=router