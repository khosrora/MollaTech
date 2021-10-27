



exports.dashboard = async (req, res) => {
    try {
        res.render("admin/public/home", {
            layout: "./layouts/adminLayout",
            title: "داشبورد مدیریتی",
            bread: "صفحه اول"
        })
    } catch (err) {
        console.log(err.message)
    }
}