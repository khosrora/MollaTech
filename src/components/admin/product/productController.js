const Category = require('../categories/model/categories');
const Product = require('./model/Product');
const Attribute = require('./model/attribute');


// ! helper 
const { slug } = require('../../../helper/slug');
const { truncate } = require('../../../helper/truncate');
const { jalaliMoment } = require('../../../helper/jalali');

// ? dec ==>get create product page
// ? path ==> /admin/createProduct
exports.getCreateProduct = async (req, res) => {
    try {
        // ! get items 
        const categories = await Category.find();

        res.render("admin/product/createProduct", {
            layout: "./layouts/adminLayout",
            title: "ساخت محصول ",
            bread: "ساخت محصول",
            categories,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> create product page
// ? path ==> /admin/createProduct
exports.createProduct = async (req, res) => {
    const errors = []
    // ! get items 
    const categories = await Category.find();
    let files = [];
    try {
        // ! validation
        await Product.productValidate(req.body)
        if (req.files.image) {
            const images = req.files.image;
            for (let image of images) {
                var { filename } = image;
                files.push(filename)
            }
        } else {
            errors.push({
                message: "لطفا حداقل یک عکس انتخاب کنید"
            });
            return res.render("admin/product/createProduct", {
                layout: "./layouts/adminLayout",
                title: "ساخت محصول ",
                bread: "ساخت محصول",
                categories,
                message: req.flash("success_msg"),
            })
        }
        // ! get items
        req.body = { ...req.body }
        await Product.create({
            ...req.body, image: files, slug: slug(req.body.title), user: req.user._id
        })

        // ! redirect
        req.flash("success_msg", "اضافه کردن محصول با موفقیت به اتمام رسید")
        res.redirect("/admin/createProduct")

    } catch (err) {
        errors.push({
            message: err.message
        })
        res.render("admin/product/createProduct", {
            layout: "./layouts/adminLayout",
            title: "ساخت محصول ",
            bread: "ساخت محصول",
            categories,
            errors,
            message: req.flash("success_msg")
        })
    }
}


// ? dec ==> get all product
// ? path ==> /admin/getAllProduct
exports.getAllProduct = async (req, res) => {
    try {

        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var products = await Product.find({ title: query }).populate("user").sort({ createdAt: -1 });
        } else {
            var products = await Product.find().populate("user").sort({ createdAt: -1 });
        }

        res.render("admin/product/getAllProduct", {
            layout: "./layouts/adminLayout",
            title: "محصولات ",
            bread: "محصولات",
            products,
            truncate,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> change is Active product
// ? path ==> /admin/isActive:id
exports.isActiveProduct = async (req, res) => {
    try {
        // ! get product
        const product = await Product.findOne({ _id: req.params.id });

        if (product.isActive) {
            product.isActive = false;
            await product.save()
            req.flash("success_msg", `محصول ${product.title} غیر فعال شد`);
            const backUrl = req.header('Referer') || "/getAllComments";
            res.redirect(backUrl);
        } else {
            product.isActive = true;
            await product.save()
            req.flash("success_msg", `محصول ${product.title} فعال شد`);
            const backUrl = req.header('Referer') || "/getAllComments";
            res.redirect(backUrl);
        }

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> product single page
// ? path ==> /admin/singleProduct
exports.singleProduct = async (req, res) => {
    const errors = []
    try {
        // ! get product
        const product = await Product.findOne({ _id: req.params.id }).populate("user");
        const attributes = await Attribute.find({ product: req.params.id });

        return res.render("admin/product/singleProduct", {
            layout: "./layouts/adminLayout",
            title: `محصول ${product.title}`,
            bread: `${product.title}`,
            product,
            jalaliMoment,
            errors,
            attributes,
            message: req.flash("success_msg")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> edit product single page
// ? path ==> /admin/editProduct/:id
exports.getEditProduct = async (req, res) => {
    try {
        // ! get product && categories
        const product = await Product.findOne({ _id: req.params.id }).populate("user");
        const categories = await Category.find();

        return res.render("admin/product/editProduct", {
            layout: "./layouts/adminLayout",
            title: `ویرایش محصول ${product.title}`,
            bread: `ویرایش محصول ${product.title}`,
            product,
            categories,
            jalaliMoment,
            message: req.flash("success_msg"),
            error: req.flash("error")
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> edit product single page
// ? path ==> /admin/editProduct/:id
exports.editProduct = async (req, res) => {
    try {
        // ! get items
        const { id, title, price, desc, technical, offer } = req.body;
        // ! validation
        if (!id || !title || !price || !desc || !technical) {
            req.flash("error", "لطفا تمام مقادیر را کامل کنید")
            const backUrl = req.header('Referer');
            return res.redirect(backUrl);
        }
        if (!offer) {
            checkbox = "off"
        } else {
            checkbox = "on"
        }
        // ! find product
        await Product.findByIdAndUpdate({ _id: id }, {
            title, price, desc, technical, offer: checkbox
        })
        // ! send message
        req.flash("success_msg", "اطلاعات با موفقیت ویرایش شد");
        return res.redirect("/admin/getAllProduct");

    } catch (err) {
        console.log(err.message);
    }
}


// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
exports.getCreateAtrribute = async (req, res) => {
    try {

        const id = req.params.id;

        res.render("admin/product/createAttribute", {
            layout: "./layouts/adminLayout",
            title: "ساخت ویژگی محصول ",
            bread: "ساخت ویژگی محصول",
            id,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
exports.createAtrribute = async (req, res) => {
    try {
        // ! get items
        const { price, color, id, offerPrice, discount } = req.body;
        // ! validate price && color
        if (!price || !color) {
            req.flash("error", "لطفا رنگ و قیمت را وارد کنید");
            const backUrl = req.header('Referer') || "/getAllComments";
            return res.redirect(backUrl);
        }
        // ! create attr product
        await Attribute.create({
            ...req.body, product: id
        })
        // ! send message
        req.flash("success_msg", "ویژگی جدید اضافه شد");
        res.redirect("/admin/singleProduct/" + id)

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
exports.getEditAttribute = async (req, res) => {
    try {

        // !get id
        const id = req.params.id
        const attr = await Attribute.findOne({ _id: id })

       return res.render("admin/product/editAttribute", {
            layout: "./layouts/adminLayout",
            title: "ساخت ویژگی محصول ",
            bread: "ساخت ویژگی محصول",
            id,
            attr,
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> create product attribute
// ? path ==> /admin/createAtrr
exports.editAttribute = async (req, res) => {
    try {
        // ! get items 
        const { id, price, offerPrice, count, color } = req.body;
        // ! validation
        if (!id || !price || !count || !color) {
            req.flash("error", "لطفا تمام مقادیر را کامل کنید")
            const backUrl = req.header('Referer');
            return res.redirect(backUrl);
        }
        // !find attr
        await Attribute.findByIdAndUpdate({ _id: id }, {
            price, offerPrice, count, color
        });
        // ! send message
        req.flash("success_msg", "اطلاعات با موفقیت ویرایش شد");
        const backUrl = req.header('Referer');
        return res.redirect(backUrl);

    } catch (err) {
        console.log(err.message);
    }
}

// ? dec ==> delete product attribute
// ? path ==> /admin/deleteAtrribute
exports.deleteAtrribute = async (req, res) => {
    try {
        // ! delete
        await Attribute.findByIdAndDelete({ _id: req.params.id });
        // ! send message
        req.flash("success_msg", "ویژگی محصول حذف شد");
        const backUrl = req.header('Referer') || "/getAllComments";
        return res.redirect(backUrl);
    } catch (err) {
        console.log(err.message);
    }
}