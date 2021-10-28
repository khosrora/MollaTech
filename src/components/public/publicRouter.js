const { Router } = require('express');
const router = new Router();


// ! controller
const publicController = require('./publicController');

// ! middleware
const { isLogged, auth  } = require('../../middleware/isLogged');

// ? dec ==> render home page
// ? path ==> /
router.get("/", auth, publicController.index)

// ? dec ==> render about us page
// ? path ==> /about us
router.get("/aboutus", auth, publicController.aboutUs)

// ? dec ==> render contact us page
// ? path ==> /contact us
router.get("/contactus", auth, publicController.contactUs)

// ? dec ==> render faq page
// ? path ==> /faq
router.get("/faq", auth, publicController.faq)

// ? dec ==> render register page
// ? path ==> /register
router.get("/register", isLogged, auth, publicController.register)

// ? dec ==> render register page
// ? path ==> /activeCode
router.get("/activeCode", isLogged, auth, publicController.activeCode)

// ? dec ==> render register page
// ? path ==> /sendCode
router.get("/sendCode", isLogged, auth, publicController.sendCode)

// ? dec ==> render login page
// ? path ==> /login
router.get("/login", isLogged, auth, publicController.login)

// ? dec ==> render forgot pass page
// ? path ==> /forgotPass
router.get("/forgotPass", isLogged, auth, publicController.getForgotPassword)

// ? dec ==>  forgot pass 
// ? path ==> /forgotPass
router.post("/forgotPass", isLogged, auth, publicController.forgotPassword)

// ? dec ==>  reset pass 
// ? path ==> /resetPass
router.get("/resetPass", isLogged, auth, publicController.getResetPassword)

// ? dec ==>  reset pass 
// ? path ==> /resetPass
router.post("/resetPass", isLogged, auth, publicController.resetPassword)





module.exports = router;