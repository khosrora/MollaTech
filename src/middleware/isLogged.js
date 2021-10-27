// not  access to login page
exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}


// find user
exports.auth = (req, res, next) => {
    if (req.user) {
        auth = true;
        if (req.user.isAdmin == "Admin") {
            admin = true
        } else {
            admin = false
        }
        next();
    } else {
        auth = false;
        next();
    }
}