const Comment = require('../../user/model/comment');

// ! helper
const { truncate } = require('../../../helper/truncate');


// ? dec ==> get comments page
// ? path ==> /admin/getAllComments
exports.getAllComments = async (req, res) => {
    try {

        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var comments = await Comment.find({ name: query }).sort({ createdAt: -1 });
        } else {
            var comments = await Comment.find().sort({ createdAt: -1 });
        }

        res.render("admin/comments/getAllComments", {
            layout: "./layouts/adminLayout",
            title: "نظرات کاربران",
            bread: "نظرات کاربران",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            comments,
            truncate
        })

    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==>delete comments
// ? path ==> /admin/deleteComment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete({ _id: req.params.id })
        // ! send message
        req.flash("success_msg", "کامنت با موفقیت حذف شد")
        const backUrl = req.header('Referer') || "/getAllComments";
        res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}