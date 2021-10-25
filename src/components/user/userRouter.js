const { Router } = require('express');
const router = new Router();


// ! controller
const userController = require('./userController');


// ? dec ==> register user
// ? path ==> auth/register
router.post("/register", userController.register)

// ? dec ==> login user
// ? path ==> auth/login
router.post("/login", userController.login)





module.exports = router;