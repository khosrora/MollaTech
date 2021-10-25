const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('./model/userModel');

// * hellper
const nanoId = require('../../helper/nanoId');


// ? dec ==> register user
// ? path ==> auth/register
exports.register = async (req, res) => {
    const errors = [];
    try {
        // ! get items
        const { fullname, email, password, mobile } = req.body;
        // ! validation
        await User.userValidate(req.body)
        // ! checked user
        const user = await User.findOne({ $or: [{ email }, { mobile }] });
        if (user) {
            // ! show message 
            errors.push({
                message: "دوست من شما قبلا ثبت نام کرده اید"
            })
            return res.render("public/register.ejs", {
                title: "ورود کاربر",
                errors,
                message: req.flash("success_msg")
            });
        }
        // ! bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // ! create new user 
        const newUser = await User.create({
            fullname, email, password: hash, mobile, mobileActiveCode: nanoId()
        })
        // ! send mobile active code
        console.log(`کد فعال سازی شما در وبسایت : ${newUser.mobileActiveCode}`);
        // ! show message 
        req.flash("success_msg", "ثبت نام شما با موفقیت به اتمام رسید ");
        // ! redirect user
        res.redirect("/login")

    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("public/register.ejs", {
            title: "ورود کاربر",
            errors,
            message: req.flash("success_msg")
        })
    }
}


// ? dec ==> login user
// ? path ==> auth/login
exports.login = async (req, res, next) => {
    const errors = [];
    try {
        // ! get items 
        const { email, password, remember } = req.body;
        if (!email || !password) {
            req.flash("error", "لطفا تمام مقادیر را کامل کنید");
            return res.render("public/login.ejs", {
                title: "ورود کاربر",
                message: req.flash("success_msg"),
                error: req.flash("error"),
            })
        }
        // ! set session
        if (remember == "on") {
            req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 * 30;
        } else {
            req.session.cookie.expire = null;
        }
        // !user login
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("public/login.ejs", {
            title: "ورود کاربر",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    }
}