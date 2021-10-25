const { Router } = require('express');
const router = new Router();


// ! controller
const publicController = require('./publicController');


// ? dec ==> render home page
// ? path ==> /
router.get("/", publicController.index)

// ? dec ==> render about us page
// ? path ==> /about us
router.get("/aboutus", publicController.aboutUs)

// ? dec ==> render contact us page
// ? path ==> /contact us
router.get("/contactus", publicController.contactUs)

// ? dec ==> render register page
// ? path ==> /auth
router.get("/register", publicController.register)

// ? dec ==> render login page
// ? path ==> /login
router.get("/login", publicController.login)





module.exports = router;