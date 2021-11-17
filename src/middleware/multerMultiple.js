const path = require('path')
const multer = require("multer");


// !
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })
exports.uploadMultiple = upload.fields([{ name: 'image', maxCount: 10 }])
// !
