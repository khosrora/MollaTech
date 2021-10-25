


// ? dec ==> render home page
// ? path ==> /
exports.index = async (req, res) => {
    res.render("public/index.ejs", {
        title: "صفحه اصلی"
    })
}


// ? dec ==> render home page
// ? path ==> /about us
exports.aboutUs = async (req, res) => {
    res.render("public/aboutUs.ejs", {
        title: "درباره ما",
        bread: "درباره ما",
    })
}


// ? dec ==> render home page
// ? path ==> /contact us
exports.contactUs = async (req, res) => {
    res.render("public/contactUs.ejs", {
        title: "تماس با ما",
        bread: "تماس با ما",
    })
}


// ? dec ==> render register page
// ? path ==> /register
exports.register = async (req, res) => {
    try {
        res.render("public/register.ejs", {
            title: "ثبت نام کاربر",
            bread: "ثبت نام کاربر",
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
        res.render("public/login.ejs", {
            title: "ورود کاربر",
            bread: "ورود کاربر",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message)
    }
}