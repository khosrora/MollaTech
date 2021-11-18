const { Router } = require('express');
const router = new Router();


// ! controller
const publicController = require('./publicController');

// ! middleware
const { isLogged, auth } = require('../../middleware/isLogged');

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

// ? dec ==> render blogs page
// ? path ==> /blogs
router.get("/blogs", auth, publicController.getBlogs)

// ? dec ==> render blog page
// ? path ==> /blog
router.get("/blog/:slug", auth, publicController.getBlog)

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

// ? dec ==>  products 
// ? path ==> /products
router.get("/products", auth, publicController.getAllProducts)

// ? dec ==>  products 
// ? path ==> /products
router.get("/productsCategory/:categories/:subCate", auth, publicController.getAllProductsCategories)

// ? dec ==>  products 
// ? path ==> /products
router.get("/productsBrand/:brand", auth, publicController.getAllProductsBrands)

// ? dec ==> get single product 
// ? path ==> /product/:slug
router.get("/product/:slug", auth, publicController.getProduct)

// ? dec ==> basket page 
// ? path ==> /basket
router.get("/basket", auth, publicController.getBasket)





module.exports = router;