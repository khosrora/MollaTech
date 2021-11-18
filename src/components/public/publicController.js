
const bcrypt = require('bcrypt');

const User = require('../user/model/userModel');
const Category = require('../admin/categories/model/categories');
const Product = require('../admin/product/model/Product');
const Attribute = require('../admin/product/model/attribute');
const Blog = require('../admin/blogs/model/blog');
const Comment = require('../user/model/comment');

// ! hellper
const { truncate } = require('../../helper/truncate');
const { jalaliMoment } = require('../../helper/jalali');
const { separate } = require('../../helper/seperate');


// ? dec ==> render home page
// ? path ==> /
exports.index = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        // ! get blogs
        const blogs = await Blog.find().populate("user");

        return res.render("public/index.ejs", {
            title: "صفحه اصلی",
            auth,
            categories,
            blogs,
            jalaliMoment
        })
    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==> render home page
// ? path ==> /about us
exports.aboutUs = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/aboutUs.ejs", {
            title: "درباره ما",
            bread: "درباره ما",
            auth,
            categories
        })
    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==> render home page
// ? path ==> /contact us
exports.contactUs = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/contactUs.ejs", {
            title: "تماس با ما",
            bread: "تماس با ما",
            auth,
            categories
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render faq page
// ? path ==> /faq
exports.faq = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/faq.ejs", {
            title: "سوالات متداول",
            bread: "سوالات متداول",
            auth,
            categories
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render blogs page
// ? path ==> /blogs
exports.getBlogs = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        const blogs = await Blog.find().populate("user");
        const blogPopular = await Blog.find().sort({ view: -1 }).limit(6);

        res.render("public/blogs.ejs", {
            title: "بلاگ ها",
            bread: "بلاگ ها",
            auth,
            categories,
            blogs,
            truncate,
            jalaliMoment,
            blogPopular
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render blog page
// ? path ==> /blog
exports.getBlog = async (req, res) => {
    try {

        // ? test
        // db.posts.find({_id: {$gt: curId}}).sort({_id: 1 }).limit(1)

        // ! get params
        const slug = req.params.slug;
        const blogs = await Blog.find().limit(6);
        const blogPopular = await Blog.find().sort({ view: -1 }).limit(6);
        const blog = await Blog.findOne({ slug }).populate("user");
        const prevBlog = await Blog.findOne({ _id: { $lt: blog.id } }).sort({ _id: -1 }).limit(1);
        const nextBlog = await Blog.findOne({ _id: { $gt: blog.id } }).sort({ _id: 1 }).limit(1)
        const comments = await Comment.find({ post: blog._id });
        blog.view += 1;
        await blog.save();


        // ! get categories
        const categories = await Category.find();
        // ! get user
        const user = req.user;
        return res.render("public/blog.ejs", {
            title: `${blog.title}`,
            bread: "بلاگ",
            auth,
            message: req.flash("success_msg"),
            error: req.flash("error"),
            categories,
            truncate,
            jalaliMoment,
            blogPopular,
            blogs,
            blog,
            comments,
            user,
            nextBlog,
            prevBlog
        })

    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render register page
// ? path ==> /register
exports.register = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/register.ejs", {
            title: "ثبت نام کاربر",
            bread: "ثبت نام کاربر",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render register page
// ? path ==> /register
exports.activeCode = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/activeCode.ejs", {
            title: "فعال سازی کاربر",
            bread: "فعال سازی کاربر",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render register page
// ? path ==> /register
exports.sendCode = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/sendCode.ejs", {
            title: "ارسال کد فعال سازی",
            bread: "ارسال کد فعال سازی",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render login page
// ? path ==> /login
exports.login = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/login.ejs", {
            title: "ورود کاربر",
            bread: "ورود کاربر",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==> render forgot pass page
// ? path ==> /forgotPass
exports.getForgotPassword = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/forgotPass.ejs", {
            title: "ارسال کد",
            bread: "ارسال کد",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render forgot pass page
// ? path ==> /forgotPass
exports.forgotPassword = async (req, res) => {
    try {
        // ! get items
        const { mobile } = req.body;
        // ! validation
        if (!mobile) {
            req.flash("error", "لطفا شماره تماس خود را وارد کنید")
            return res.redirect("/forgotPass")
        }
        // ! find user
        const user = await User.findOne({ mobile });
        if (!user) {
            req.flash("error", "کاربری با این مشخصات پیدا نشد")
            return res.redirect("/forgotPass")
        }
        // ! send code 
        console.log(`کد شما : ${user.mobileActiveCode}`)
        // ! redirect
        req.flash("success_msg", "کد فعال سازی برای شما ارسال شد")
        res.redirect("/resetPass")

    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> render forgot pass page
// ? path ==> /forgotPass
exports.getResetPassword = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        res.render("public/resetPass.ejs", {
            title: "بازیابی رمز عبور",
            bread: "بازیابی رمز عبور",
            auth,
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==>  reset pass 
// ? path ==> /resetPass
exports.resetPassword = async (req, res) => {
    try {
        // ! get items
        const { mobile, code, password } = req.body;
        // ! validation
        if (!mobile || !code || !password) {
            req.flash("error", "لطفا تمام مقادیر را وارد کنید")
            return res.redirect("/resetPass")
        }
        // ! find user 
        const user = await User.findOne({ mobile });
        if (!user) {
            req.flash("error", "کاربری با این مشخصات پیدا نشد")
            return res.redirect("/resetPass")
        }
        // ! create new pass
        if (user.mobileActiveCode == code) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            user.password = hash;
            await user.save();
            req.flash("success_msg", "کلمه عبور با موفقیت تغییر کرد !!")
            return res.redirect("/login")
        } else {
            req.flash("error", "کد وارد شده اشتباه است")
            return res.redirect("/resetPass")
        }
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>  products 
// ? path ==> /products
exports.getAllProducts = async (req, res) => {
    try {
        // ! get query
        const q = req.query.sortby;
        const b = Object.keys(req.query);   
        // ! get categories
        const categories = await Category.find();
        if (b.length !== 0) {
            var products = await Product.find({
                $and: [
                    { isActive: true },
                    { brand: b }
                ]
            }).sort({ createdAt: q });
        } else {
            var products = await Product.find({ isActive: true }).sort({ createdAt: q });
        }


        return res.render("public/products.ejs", {
            title: "محصولات",
            bread: "محصولات",
            auth,
            categories,
            products,
            truncate,
            separate,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err.message)
    }
}



// ? dec ==>  products 
// ? path ==> /products with categories
exports.getAllProductsCategories = async (req, res) => {
    try {
        // ! get query
        const c = req.params.categories;
        const s = req.params.subCate;
        // ! get categories
        const categories = await Category.find();
        const products = await Product.find({
            $and: [
                { categories: c },
                { brand: s },
                { isActive: true }
            ]
        }).sort({ createdAt: -1 });

        return res.render("public/products.ejs", {
            title: "محصولات",
            bread: "محصولات",
            auth,
            categories,
            products,
            truncate,
            separate,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>  products 
// ? path ==> /products with categories
exports.getAllProductsBrands = async (req, res) => {
    try {
        // ! get query
        const p = req.params.brand;
        // ! get categories
        const categories = await Category.find();
        const products = await Product.find({
            $and: [
                { brand: p },
                { isActive: true }
            ]
        }).sort({ createdAt: -1 });

        return res.render("public/products.ejs", {
            title: "محصولات",
            bread: "محصولات",
            auth,
            categories,
            products,
            truncate,
            separate,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> get single product 
// ? path ==> /product/:slug
exports.getProduct = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        // ! find product && attribute Product 
        const product = await Product.findOne({ slug: req.params.slug });
        const suggProducts = await Product.find({ brand: product.brand });
        const attribute = await Attribute.find({ product: product._id });
        product.view += 1;
        await product.save();

        return res.render("public/singleProduct.ejs", {
            title: `${product.title}`,
            bread: `${product.title}`,
            auth,
            categories,
            product,
            suggProducts,
            attribute,
            truncate,
            separate,
            jalaliMoment,
        })
    } catch (err) {
        console.log(err.message)
    }
}



// ? dec ==> basket page 
// ? path ==> /basket
exports.getBasket = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();

        return res.render("public/basket.ejs", {
            title: "سبد خرید",
            bread: "سبد خرید",
            auth,
            categories,
            error: req.flash("error")
        })
    } catch (err) {
        console.log(err.message)
    }
}
