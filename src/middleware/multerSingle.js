const path = require('path')
const multer = require("multer");


// !
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/blog/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({ storage: storage })
// !