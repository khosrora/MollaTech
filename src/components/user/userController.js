const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('./model/userModel');
const Cart = require('./model/cartModel');
const Category = require('../admin/categories/model/categories');
const Discount = require('../admin/product/model/discount');
const Comment = require('./model/comment');


const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);


// * hellper
const nanoId = require('../../helper/nanoId');
const { separate } = require('../../helper/seperate');


// ? dec ==> register user
// ? path ==> auth/register
exports.register = async (req, res) => {
    const errors = [];
    try {
        // ! get categories
        const categories = await Category.find();
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
                bread: "ورود کاربر",
                auth,
                errors,
                categories,
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
            bread: "ورود کاربر",
            auth,
            errors,
            categories,
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
        // ! get categories
        const categories = await Category.find();
        // ! get items 
        const { email, password, remember } = req.body;
        if (!email || !password) {
            req.flash("error", "لطفا تمام مقادیر را کامل کنید");
            return res.render("public/login.ejs", {
                title: "ورود کاربر",
                bread: "ورود کاربر",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                categories
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
            bread: "ورود کاربر",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    }
}

// ? dec ==> dashboard user
// ? path ==> auth/dashboard
exports.getDashboard = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        // ! get user
        const user = req.user;

        res.render("user/dashboard", {
            title: "داشبورد کاربر",
            bread: "داشبورد",
            categories,
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
        // ! get categories
        const categories = await Category.find();
        // ! get user
        const user = req.user;

        res.render("user/editUser", {
            title: "ویرایش حساب کاربری",
            bread: "ویرایش حساب کاربری",
            categories,
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

// ? dec ==> get payment User
// ? path ==> auth/paymentUser
exports.paymentsUser = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        // ! get user
        const user = req.user;
        const payments = await Cart.find({ user: user._id });

        res.render("user/paymentsUser", {
            title: "سفارشات",
            bread: "سفارشات",
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
            payments,
            user
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> get payment User
// ? path ==> auth/paymentUser
exports.paymentUser = async (req, res) => {
    try {
        // ! get categories
        const categories = await Category.find();
        // ! get user
        const user = req.user;
        const payment = await Cart.findOne({ codePayment: req.params.code })

        res.render("user/paymentUser", {
            title: "سفارشات",
            bread: "سفارشات",
            categories,
            message: req.flash("success_msg"),
            error: req.flash("error"),
            payment,
            user,
            separate
        })
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

// ? desc ==> create comment
// ? path ==> auth/comment
exports.comment = async (req, res) => {
    const errors = [];
    try {
        // ! get items
        const { name, email, text, id } = req.body;
        // ! validate
        await Comment.commentValidate(req.body);
        // ! create comment
        await Comment.create({
            name, email, text, post: id
        })
        // ! req.flash 
        req.flash("success_msg", "نظر شما با موفقیت ارسال شد");
        const backUrl = req.header('Referer') || "/blogs";
        res.redirect(backUrl)
    } catch (err) {
        errors.push({
            message: err.message
        })
        console.log(err.message);
    }
}

// ? desc ==> check out user
// ? path ==> auth/checkout
exports.payment = async (req, res) => {
    try {
        // ! get items
        const user = req.user;
        const categories = await Category.find();
        // ! validation
        if (!user) {
            req.flash("error", "لطفا برای پرداخت ابتدا وارد وب سایت شوید");
            return res.redirect("/basket")
        }
        // ! validation
        if (!user.address) {
            req.flash("error", "لطفا برای پرداخت آدرس خود را از پنل کاربری وارد کنید");
            return res.redirect("/basket")
        }
        //! Get a cookies
        var cartItems = JSON.parse(req.cookies.cart__Molla);
        var discount = req.cookies.discount__Molla;
        // ! validation
        if (cartItems.length === 0) {
            req.flash("error", "حداقل یک محصول را در سبد خرید قرار دهید");
            return res.redirect("/basket")
        }

        let totalCarts = 0;
        let productId = [];
        // ! discount
        if (discount) {
            const disCountUser = await Discount.findOne({ name: discount });
            if (!disCountUser) {
                req.flash("error", "کد تخفیف شما اشتباه است یا مدت تخفیف تمام شده است");
                res.clearCookie("discount__Molla")
                return res.redirect("/basket");
            }
            if (disCountUser.isActive) {
                let calcDiscount = 0;
                cartItems.forEach(async i => {
                    var totalItemCarts = i.price * i.quantity;
                    calcDiscount = totalItemCarts++ * disCountUser.amount++ / 100;
                    totalCarts += totalItemCarts++ - calcDiscount;
                    productId.push({
                        count: i.quantity,
                        color: i.color,
                        price: i.price,
                        image: i.image,
                        attribute: i.id
                    })
                })
            } else {
                req.flash("error", "کد تخفیف در حال حاضر فعال نیست");
                res.clearCookie("discount__Molla")
                return res.redirect("/basket");
            }
        } else {
            cartItems.forEach(async i => {
                var totalItemCarts = i.price * i.quantity;
                totalCarts += totalItemCarts++;
                productId.push({
                    count: i.quantity,
                    color: i.color,
                    price: i.price,
                    image: i.image,
                    attribute: i.id
                })
            })
        }
        const cart = await Cart.create({
            user: req.user._id,
            products: productId,
            priceProduct: totalCarts,
            codePayment: nanoId(6)
        })
        zarinpal.PaymentRequest({
            Amount: totalCarts + 30000, // In Tomans
            CallbackURL: `${process.env.url}/auth/verifyPayment?q=${cart.codePayment}`,
            Description: 'پرداخت به درگاه اینترنتی فروشگاه رابا',
            Email: user.email,
            Mobile: user.mobile
        }).then(response => {
            if (response.status === 100) {
                res.redirect(response.url);
            }
        }).catch(err => {
            console.error(err);
            req.flash("error", "متاسفانه مشکلی از سمت درگاه پیش آمده است لطفا دوباره امتحان کنید");
            return res.render("public/basket.ejs", {
                title: "سبد خرید",
                bread: "سبد خرید",
                auth,
                categories,
                error: req.flash("error")
            })
        });

    } catch (err) {
        console.log(err.message);
    }
}

// ? desc ==> check out user
// ? path ==> auth/checkout
exports.verifyPayment = async (req, res) => {
    try {
        // ! get query
        const status = req.query.Status;

        if (status === "OK") {
            const cart = await Cart.findOne({ codePayment: req.query.q });
            cart.isSuccess = true;
            await cart.save();
            //! Clearing the cookie
            res.clearCookie("cart___items");
            // ! send message
            req.flash("success_msg", "سفارش شما با موفقیت ثبت شد")
            res.clearCookie("discount__Molla")
            res.redirect("/auth/dashboard");
        } else {
            req.flash("error", "متاسفانه عملیات پرداخت با شکست مواجه شد");
            res.clearCookie("discount__Molla")
            res.redirect("/basket")
        }
    } catch (err) {
        console.log(err.message);
    }
}