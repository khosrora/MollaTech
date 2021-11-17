const yup = require('yup');



exports.productValidation = yup.object().shape({
    title: yup.string().required("وارد کردن  عنوان الزامی است"),
    desc: yup.string().required("وارد کردن  توضیحات الزامی است"),
    technical: yup.string().required("وارد کردن  مشخصات فنی الزامی است"),
    categories: yup.string().required("وارد کردن  دسته بندی الزامی است"),
    brand: yup.string().required("وارد کردن  برند الزامی است"),
    price: yup.string().required("وارد کردن  قیمت الزامی است"),
});