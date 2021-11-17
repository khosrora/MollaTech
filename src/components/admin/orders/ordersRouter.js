const { Router } = require('express');
const router = new Router();

// ! controller
const ordersController = require('./ordersController');


// ? dec ==>get all orders
// ? path ==> /admin/allOrders
router.get("/allOrders", ordersController.getAllOrders);

// ? dec ==>get Send Orders
// ? path ==> /admin/sendOrders
router.get("/sendOrders", ordersController.getSendOrders);

// ? dec ==>get Not Send Orders
// ? path ==> /admin/sendOrders
router.get("/notSendOrders", ordersController.getNotSendOrders);

// ? dec ==>get Order
// ? path ==> /admin/getOrder/:code
router.get("/order/:code", ordersController.getOrder);

// ? dec ==>send Order
// ? path ==> /admin/send/:code
router.get("/send/:code", ordersController.sendOrder);

// ? dec ==>send Order
// ? path ==> /admin/send/:code
router.get("/notSend/:code", ordersController.notSendOrder);






module.exports = router;