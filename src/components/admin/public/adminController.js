const Comment = require('../../user/model/comment');
const User = require('../../user/model/userModel');
const Blog = require('../../admin/blogs/model/blog');


// ! helper
const { truncate } = require('../../../helper/truncate');

// ? dec ==> render dashboard admin
// ? path ==> /admin/dashboard
exports.dashboard = async (req, res) => {
    try {
        // ! get items
        const blogs = await Blog.find().limit(3);
        const comments = await Comment.find().limit(3);
        const userLength = await User.countDocuments();

        res.render("admin/public/home", {
            layout: "./layouts/adminLayout",
            title: "داشبورد مدیریتی",
            bread: "صفحه اول",
            blogs,
            userLength,
            comments,
            truncate
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> delete comment
// ? path ==> /admin/deleteComment/:id
exports.deleteComment = async (req, res) => {
    try {
        // ! get comment & delete
        await Comment.findByIdAndDelete({ _id: req.params.id });
        const backUrl = req.header('Referer') || "/blogs";
        res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}