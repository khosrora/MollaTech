const Category = require('../categories/model/categories');
const Blog = require('./model/blog');
const fs = require('fs');
const appRoot = require('app-root-path');

// ! helper 
const { slug } = require('../../../helper/slug');

// ? dec ==> get category page
// ? path ==> /admin/createCategory
exports.getCreateBlog = async (req, res) => {
    const errors = [];
    try {
        // ! get categories
        const categories = await Category.find();

        res.render("admin/blog/createBlog", {
            layout: "./layouts/adminLayout",
            title: "ساخت بلاگ",
            bread: "ساخت بلاگ",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            errors,
            categories
        })

    } catch (err) {
        console.log(err.mesesage)
    }
}

// ? dec ==> get category page
// ? path ==> /admin/createCategory
exports.createBlog = async (req, res) => {
    const errors = [];
    // ! get categories
    const categories = await Category.find();
    // ! get users
    const user = req.user;
    try {
        // ! get items
        const { title, desc, tags } = req.body;
        // ! image
        if (!req.file) {
            req.flash("error", "لطفا یک عکس انتخاب کنید");
            return res.render("admin/blog/createBlog", {
                layout: "./layouts/adminLayout",
                title: "ساخت بلاگ",
                bread: "ساخت بلاگ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                errors,
                categories
            })

        }
        // ! validation
        const blog = await Blog.findOne({ slug: title });
        if (blog) {
            fs.unlinkSync(`${appRoot}/public/uploads/images/blog/` + req.file.filename);
            errors.push({
                message: "بلاگی با این اسم ساخته شده است"
            });
            return res.render("admin/blog/createBlog", {
                layout: "./layouts/adminLayout",
                title: "ساخت بلاگ",
                bread: "ساخت بلاگ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                errors,
                categories
            })
        }
        await Blog.blogValidate(req.body);
        // ! create blog
        await Blog.create({
            user: user._id, title, desc, items: tags, slug: slug(title), image: req.file.filename
        })
        //! redirect
        req.flash("success_msg", "بلاگ با موفقیت ساخته شد");
        return res.redirect("/admin/createBlog");
    } catch (err) {
        if (req.file) {
            fs.unlinkSync(`${appRoot}/public/uploads/images/blog/` + req.file.filename);
        }
        errors.push({
            message: err.message
        });
        return res.render("admin/blog/createBlog", {
            layout: "./layouts/adminLayout",
            title: "ساخت بلاگ",
            bread: "ساخت بلاگ",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            errors,
            categories
        })
    }
}

// ? dec ==> get get All Blogs
// ? path ==> /admin/getAllBlogs
exports.getAllBlogs = async (req, res) => {
    try {
        // ! get blogs
        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var blogs = await Blog.find({ name: query }).sort({ createdAt: -1 });
        } else {
            var blogs = await Blog.find().sort({ createdAt: -1 });
        }
        res.render("admin/blog/getAllBlogs", {
            layout: "./layouts/adminLayout",
            title: " بلاگ ها",
            bread: " بلاگ ها",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            blogs
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> blogDelete
// ? path ==> /admin/blogDelete/:id
exports.blogDelete = async (req, res) => {
    try {
        // ! delete blogs
        const blog = await Blog.findByIdAndRemove({ _id: req.params.id })
        // ! delete image blog
        fs.unlinkSync(`${appRoot}/public/uploads/images/blog/` + blog.image);
        // ! send message
        req.flash("success_msg", "بلاگ با موفقیت حذف شد")
        const backUrl = req.header('Referer') || "/blogs";
        res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}