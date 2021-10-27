const Category = require('./model/categories');



// ? dec ==> get category page
// ? path ==> /admin/createCategory
exports.getCategoryPage = async (req, res) => {
    try {
        // ! get categories 
        const categoriesItem = await Category.find({ category: null });
        res.render("admin/category/createCategory", {
            layout: "./layouts/adminLayout",
            title: "ساخت دسته بندی",
            bread: "ساخت دسته بندی",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            categoriesItem
        })

    } catch (err) {
        console.log(err.mesesage)
    }
}

// ? dec ==> create category 
// ? path ==> /admin/createCategory
exports.categoryPage = async (req, res) => {
    try {
        // ! get items 
        const { name, parent } = req.body;
        let item;
        if (parent === "") {
            item = null;
        } else {
            item = parent
        }
        // ! validation
        if (!name) {
            req.flash("error", "لطفا نام دسته بندی را وارد کنید");
            return res.redirect("/admin/createCategory")
        }
        // ! find category
        if (item === null) {
            const category = await Category.findOne({ name });
            if (category) {
                req.flash("error", "دسته بندی مورد نظر قبلا ثبت شده است");
                return res.redirect("/admin/createCategory");
            }
        }
        // ! create category
        await Category.create({
            name, category: item
        })
        // ! show message
        req.flash("success_msg", "دسته بندی با موفقیت ثبت شد");
        return res.redirect("/admin/createCategory")

    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> get All Category  
// ? path ==> /admin/getAllCategory
exports.getAllCategory = async (req, res) => {
    try {
        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var categories = await Category.find({ name: query }).sort({ createdAt: -1 });
        } else {
            var categories = await Category.find().sort({ createdAt: -1 });
        }
        res.render("admin/category/getAllCategory", {
            layout: "./layouts/adminLayout",
            title: " دسته بندی ها",
            bread: " دسته بندی ها",
            message: req.flash("success_msg"),
            categories
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==> delete Category  
// ? path ==> /admin/:id
exports.deleteCategory = async (req, res) => {
    try {
        // ! get items for delete
        await Category.findByIdAndDelete({ _id: req.params.id });
        // ! show message
        req.flash("success_msg", "دسته بندی با موفقیت حذف شد");
        res.redirect("/admin/getAllCategory")
    } catch (err) {
        console.log(err.message)
    }
}