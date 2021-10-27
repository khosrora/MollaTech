
const bcrypt = require('bcrypt');

const User = require('../user/model/userModel');
const Category = require('../admin/categories/model/categories');


// ? dec ==> render home page
// ? path ==> /
exports.index = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        return res.render("public/index.ejs", {
            title: "صفحه اصلی",
            auth,
            categories
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