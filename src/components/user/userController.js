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
        req.flash("success_msg", "ثبت نام شما با موفقیت به اتمام رسید .  ");
        // ! redirect user
        res.redirect("/activeCode")

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

// ? desc ==> active dashboard user
// ? desc ==> auth/activeCode
exports.activeCode = async (req, res) => {
    try {
        // ! get items 
        const { mobile, code } = req.body;
        // ! validation
        if (!mobile || !code) {
            req.flash("error", "لطفا تمام مقادیر را وارد کنید");
            return res.redirect("/activeCode")
        }
        // ! get user
        const user = await User.findOne({ mobile });
        if (!user) {
            req.flash("error", "شما ثبت نام نکرده اید");
            return res.redirect("/activeCode")
        }
        // ! change password
        if (user.mobileActiveCode == code) {
            user.isMobileActive = true;
            user.mobileActiveCode = nanoId();
            await user.save();
            req.flash("success_msg", "اکانت کاربری شما فعال شد");
            return res.redirect("/login");
        } else {
            req.flash("error", "کد وارد شده اشتباه است");
            res.redirect("/activeCode")
        }

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> send active code
// ? path ==> auth/sendactivecode
exports.sendCode = async (req, res) => {
    try {
        // ! get items 
        const { mobile } = req.body;
        // ! validation
        if (!mobile) {
            req.flash("error", "لطفا  شماه تماس را وارد کنید");
            return res.redirect("/sendCode");
        }
        // ! find user
        const user = await User.findOne({ mobile });
        if (!user) {
            req.flash("error", "شما ثبت نام نکرده اید");
            return res.redirect("/sendCode");
        }
        // ! send sms code
        console.log(`کد شما : ${user.mobileActiveCode}`)
        // ! redirect
        req.flash("success_msg", "کد فعال سازی برای شما ارسال شد");
        res.redirect("/activeCode");

    } catch (err) {
        console.log(err.message);
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

// ? dec ==> dashboard user
// ? path ==> auth/dashboard
exports.getDashboard = async (req, res) => {
    try {
        // ! get user
        const user = req.user;

        res.render("user/dashboard", {
            title: "داشبورد کاربر",
            bread: "داشبورد",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            user
        })

    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==> edit user
// ? path ==> auth/editUser
exports.getEditUser = async (req, res) => {
    try {
        // ! get user
        const user = req.user;

        res.render("user/editUser", {
            title: "ویرایش حساب کاربری",
            bread: "ویرایش حساب کاربری",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            user
        })

    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> edit user
// ? path ==> auth/editUser
exports.editUser = async (req, res) => {
    const errors = [];
    try {
        // ! get items
        const { fullname, email, mobile, address } = req.body;
        // ! find user
        const user = req.user;
        // ! validation
        if (!fullname || !email || !mobile) {
            errors.push({
                message: "لطفا تمام مقادیر را کامل کنید"
            })
            return res.render("user/editUser", {
                title: "ویرایش حساب کاربری",
                bread: "ویرایش حساب کاربری",
                message: req.flash("success_msg"),
                errors,
                user
            })
        }
        // ! edit user
        await User.findByIdAndUpdate({ _id: user.id }, {
            fullname, email, mobile, address
        })
        // ! send message
        req.flash("success_msg", "اطلاعات شما با موفقیت ویرایش شد");
        return res.redirect("/auth/dashboard");
    } catch (err) {
        console.log(err.message)
    }
}


// ? desc ==> log out user
// ? method ==> get 
exports.logout = async (req, res) => {
    try {
        req.session = null;
        req.logout();
        res.redirect("/")
    } catch (err) {
        console.log(err.message);
    }
}