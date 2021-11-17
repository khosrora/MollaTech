const Comment = require('../../user/model/comment');
const User = require('../../user/model/userModel');
const Blog = require('../../admin/blogs/model/blog');
const Product = require('../../admin/product/model/Product');
const Cart = require('../../user/model/cartModel');


// ! helper
const { truncate } = require('../../../helper/truncate');
const { separate } = require('../../../helper/seperate');

// ? dec ==> render dashboard admin
// ? path ==> /admin/dashboard
exports.dashboard = async (req, res) => {
    try {
        // ! get items
        const blogs = await Blog.find().limit(3);
        const comments = await Comment.find().limit(3);
        const products = await Product.find().limit(6);
        const userLength = await User.countDocuments();
        const carts = await Cart.find();
        let sell = 0;
        for (let i of carts) {
            sell += i.priceProduct
        }

        const cartLength = await Cart.find({ isSend: false }).countDocuments();
        const sellLength = await Cart.find({ isSend: true }).countDocuments();

        res.render("admin/public/home", {
            layout: "./layouts/adminLayout",
            title: "داشبورد مدیریتی",
            bread: "صفحه اول",
            blogs,
            userLength,
            comments,
            truncate,
            separate,
            products,
            cartLength,
            sellLength,
            sell
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