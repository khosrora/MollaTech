const yup = require('yup');


exports.commentValidation = yup.object().shape({
    name: yup.string().required("وارد کردن نام  الزامی است"),
    email: yup.string()
        .required("وارد کردن پست الکترونیک الزامی است")
        .email("فرمت پست الکترونیک اشتباه است"),
    text: yup.string().required("وارد کردن متن الزامی است"),
});