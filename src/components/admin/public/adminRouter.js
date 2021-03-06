const { Router } = require('express');
const router = new Router();


// ! controller
const adminController = require('./adminController');

// !middleware
const { isAdmin } = require('../../../middleware/isAdmin');
const { auth } = require('../../../middleware/isLogged');


// ? dec ==> render dashboard admin
// ? path ==> /admin/dashboard
router.get("/dashboard", auth, isAdmin, adminController.dashboard)

// ? dec ==> delete comment
// ? path ==> /admin/deleteComment/:id
router.get("/deleteComment/:id", auth, isAdmin, adminController.deleteComment)




module.exports = router;