// isAdmin
exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin === "Admin") {
        next();
    } else {
        res.redirect("/404")
    }
}