// isAdmin
exports.isAdmin = (req, res, next) => {
    if (req.user.role === "Admin") {
        next();
    } else {
        res.redirect("/404")
    }
}