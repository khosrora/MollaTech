const { Router } = require('express');
const router = new Router;


// ! controller
const commentsController = require('./commentsController');


// ? dec ==> get comments page
// ? path ==> /admin/getAllComments
router.get("/getAllComments", commentsController.getAllComments);

// ? dec ==>delete comments
// ? path ==> /admin/deleteComment
router.get("/deleteComment", commentsController.deleteComment);


module.exports = router;