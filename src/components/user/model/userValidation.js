const yup = require('yup');


exports.userValidation = yup.object().shape({
    fullname: yup.string().required("وارد کردن نام کاربری الزامی است"),
    email: yup.string()
        .required("وارد کردن پست الکترونیک الزامی است")
        .email("فرمت پست الکترونیک اشتباه است"),
    mobile: yup.string().required("وارد کردن شماره همراه الزامی است")
        .matches("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}", "شماره همراه خود را چک کنید"),
    password: yup.string().required("وارد کردن کلمه عبور الزامی است")
        .min(6, "کلمه عبور شما نمیتواند کمتر از 6 کاراکتر باشد")
        .max(50),
});