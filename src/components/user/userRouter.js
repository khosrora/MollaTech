const { Router } = require('express');
const router = new Router();


// ! controller
const userController = require('./userController');

// ! middleware
const { auth } = require('../../middleware/isLogged');

// ? dec ==> register user
// ? path ==> auth/register
router.post("/register", auth, userController.register)

// ? dec ==> register user
// ? path ==> auth/register
router.post("/activeCode", auth, userController.activeCode)


// ? dec ==> send active code
// ? path ==> auth/sendCode
router.post("/sendCode", auth, userController.sendCode)

// ? dec ==> login user
// ? path ==> auth/login
router.post("/login", userController.login)

// ? dec ==> dashboard user
// ? path ==> auth/dashboard
router.get("/dashboard", auth, userController.getDashboard)

// ? dec ==> edit user
// ? path ==> auth/editUser
router.get("/editUser", auth, userController.getEditUser)

// ? dec ==> edit user
// ? path ==> auth/editUser
router.post("/editUser", auth, userController.editUser)

// ? dec ==> get payments User
// ? path ==> auth/paymentsUser
router.get("/paymentsUser", auth, userController.paymentsUser)

// ? dec ==> get payment User
// ? path ==> auth/paymentUser/:code
router.get("/paymentUser/:code", auth, userController.paymentUser)


// ? desc ==> log out user
// ? path ==> auth/logout 
router.get("/logout", auth, userController.logout)

// ? desc ==> create comment
// ? path ==> auth/comment
router.post("/comment", auth, userController.comment)

// ? desc ==> check out user
// ? path ==> auth/checkout
router.get("/payment", auth, userController.payment);

// ? desc ==> verify check out user
// ? path ==> auth/verifyPayment
router.get("/verifyPayment", auth, userController.verifyPayment);


module.exports = router;