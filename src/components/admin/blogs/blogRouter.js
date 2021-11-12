const { Router } = require('express');
const router = new Router;


// ! controller
const blogController = require('./blogController');

// ! middleware
const { upload } = require('../../../middleware/multerSingle');

// ? dec ==> get create blog page
// ? path ==> /admin/createBlog
router.get("/createBlog", blogController.getCreateBlog);

// ? dec ==> get create blog page
// ? path ==> /admin/createBlog
router.post("/createBlog", upload.single('image'), blogController.createBlog);

// ? dec ==> get All Blogs
// ? path ==> /admin/getAllBlogs
router.get("/getAllBlogs", blogController.getAllBlogs);

// ? dec ==> blogDelete
// ? path ==> /admin/blogDelete/:id
router.get("/blogDelete/:id", blogController.blogDelete);




module.exports = router;