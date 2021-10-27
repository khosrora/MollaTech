const { Router } = require('express');
const router = new Router;


// ! controller
const categoriesController = require('./categoriesController');


// ? dec ==> get category page
// ? path ==> /admin/createCategory
router.get("/createCategory", categoriesController.getCategoryPage);

// ? dec ==> create category 
// ? path ==> /admin/createCategory
router.post("/createCategory", categoriesController.categoryPage);

// ? dec ==> get All Category  
// ? path ==> /admin/getAllCategory
router.get("/getAllCategory", categoriesController.getAllCategory);

// ? dec ==> delete Category  
// ? path ==> /admin/:id
router.get("/getAllCategory/:id", categoriesController.deleteCategory);



module.exports = router;