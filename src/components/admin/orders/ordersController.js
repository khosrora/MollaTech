const Cart = require('../../user/model/cartModel');
const Attribute = require('../product/model/attribute');



// ! hellper 
const { separate } = require('../../../helper/seperate');
const { jalaliMoment } = require('../../../helper/jalali');


// ? dec ==>get all orders
// ? path ==> /admin/allOrders
exports.getAllOrders = async (req, res) => {
    try {
        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var orders = await Cart.find({ codePayment: query });
        } else {
            var orders = await Cart.find();
        }

        res.render("admin/orders/getAllOrders", {
            layout: "./layouts/adminLayout",
            title: "تمام سفارشات ",
            bread: "تمام سفارشات",
            orders,
            separate,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>get Send Orders
// ? path ==> /admin/sendOrders
exports.getSendOrders = async (req, res) => {
    try {
        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var orders = await Cart.find({
                $and: [
                    { codePayment: query },
                    { isSend: true },
                ]
            });
        } else {
            var orders = await Cart.find({ isSend: true });
        }
        res.render("admin/orders/getAllOrders", {
            layout: "./layouts/adminLayout",
            title: "تمام سفارشات ",
            bread: "تمام سفارشات",
            orders,
            separate,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>get Not Send Orders
// ? path ==> /admin/sendOrders
exports.getNotSendOrders = async (req, res) => {
    try {
        const query = req.query ? req.query.search : {};
        // ! get categories 
        if (query) {
            var orders = await Cart.find({
                $and: [
                    { codePayment: query },
                    { isSend: false },
                ]
            });
        } else {
            var orders = await Cart.find({ isSend: false });
        }
        res.render("admin/orders/getAllOrders", {
            layout: "./layouts/adminLayout",
            title: "تمام سفارشات ",
            bread: "تمام سفارشات",
            orders,
            separate,
            message: req.flash("success_msg"),
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>get Order
// ? path ==> /admin/getOrder/:code
exports.getOrder = async (req, res) => {
    try {
        // ! get order
        const order = await Cart.findOne({ codePayment: req.params.code }).populate("user");
        res.render("admin/orders/order", {
            layout: "./layouts/adminLayout",
            title: "تمام سفارشات ",
            bread: "تمام سفارشات",
            order,
            separate,
            jalaliMoment,
            message: req.flash("success_msg"),
        })

    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>get Order
// ? path ==> /admin/getOrder/:code
exports.sendOrder = async (req, res) => {
    try {
        // ! get order
        const order = await Cart.findOne({ _id: req.params.code })
        // ! calc attr
        for (let i of order.products) {
            const attr = await Attribute.findOne({ _id: i.attribute });
            attr.count = attr.count - i.count;
            await attr.save();
        }
        // ! order is send
        order.isSend = true;
        await order.save();
        // ! send message 
        req.flash("success_msg", "سفارش در دسته سفارشات ارسال شده قرار گرفت")
        const backUrl = req.header('Referer') || "/admin/allOrders";
        return res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}


// ? dec ==>get Order
// ? path ==> /admin/getOrder/:code
exports.sendOrder = async (req, res) => {
    try {
        // ! get order
        const order = await Cart.findOne({ _id: req.params.code })
        // ! calc attr
        for (let i of order.products) {
            const attr = await Attribute.findOne({ _id: i.attribute });
            attr.count = attr.count - i.count;
            await attr.save();
        }
        // ! order is send
        order.isSend = true;
        await order.save();
        // ! send message 
        req.flash("success_msg", "سفارش در دسته سفارشات ارسال شده قرار گرفت")
        const backUrl = req.header('Referer') || "/admin/allOrders";
        return res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}

// ? dec ==>get Order
// ? path ==> /admin/getOrder/:code
exports.notSendOrder = async (req, res) => {
    try {
        // ! get order
        const order = await Cart.findOne({ _id: req.params.code })
        // ! calc attr
        for (let i of order.products) {
            const attr = await Attribute.findOne({ _id: i.attribute });
            attr.count = attr.count + i.count;
            await attr.save();
        }
        // ! order is send
        order.isSend = false;
        await order.save();
        // ! send message 
        req.flash("success_msg", "سفارش در دسته سفارشات ارسال نشده قرار گرفت")
        const backUrl = req.header('Referer') || "/admin/allOrders";
        return res.redirect(backUrl);
    } catch (err) {
        console.log(err.message)
    }
}