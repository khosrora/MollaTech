const { Router } = require('express');
const router = new Router();


// ! controller
const userController = require('./userController');

// ! middleware
const { auth } = require('../../middleware/isLogged');

// ? dec ==> register user
// ? path ==> auth/register
router.post("/register", userController.register)

// ? dec ==> register user
// ? path ==> auth/register
router.post("/activeCode", userController.activeCode)


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


// ? desc ==> log out user
// ? method ==> get 
router.get("/logout", auth, userController.logout)



module.exports = router;