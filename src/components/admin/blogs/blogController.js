const Category = require('../categories/model/categories');


// ? dec ==> get category page
// ? path ==> /admin/createCategory
exports.getCreateBlog = async (req, res) => {
    try {

        // ! get categories
        const categories = await Category.find();

        res.render("admin/blog/createBlog", {
            layout: "./layouts/adminLayout",
            title: "ساخت بلاگ",
            bread: "ساخت بلاگ",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            categories
        })

    } catch (err) {
        console.log(err.mesesage)
    }
}

// ? dec ==> get category page
// ? path ==> /admin/createCategory
exports.createBlog = async (req, res) => {
    try {

    } catch (err) {
        console.log(err.mesesage)
    }
}

