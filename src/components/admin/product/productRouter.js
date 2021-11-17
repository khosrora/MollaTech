const { Router } = require('express');
const router = new Router();

// ! controller
const productController = require('./productController');

// ! middleware
const { uploadMultiple } = require('../../../middleware/multerMultiple');

// ? dec ==>get create product page
// ? path ==> /admin/createProduct
router.get("/createProduct", productController.getCreateProduct);

// ? dec ==> create product page
// ? path ==> /admin/createProduct
router.post("/createProduct", uploadMultiple, productController.createProduct);

// ? dec ==> get all product
// ? path ==> /admin/getAllProduct
router.get("/getAllProduct", productController.getAllProduct);

// ? dec ==> change is Active product
// ? path ==> /admin/isActive:id
router.get("/isActive/:id", productController.isActiveProduct);

// ? dec ==> product single page
// ? path ==> /admin/singleProduct
router.get("/singleProduct/:id", productController.singleProduct);

// ? dec ==> edit product single page
// ? path ==> /admin/editProduct/:id
router.get("/editProduct/:id", productController.getEditProduct);

// ? dec ==> edit product single page
// ? path ==> /admin/editProduct/:id
router.post("/editProduct", productController.editProduct);

// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
router.get("/createAtrr/:id", productController.getCreateAtrribute);

// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
router.post("/createAtrr", productController.createAtrribute);

// ? dec ==> edit product attribute
// ? path ==> /admin/editAtrr
router.get("/editAtrr/:id", productController.getEditAttribute);

// ? dec ==> edit product attribute
// ? path ==> /admin/editAtrr
router.post("/editAtrr", productController.editAttribute);

// ? dec ==> delete product attribute
// ? path ==> /admin/deleteAtrribute
router.get("/delAtrr/:id", productController.deleteAtrribute);




module.exports = router;