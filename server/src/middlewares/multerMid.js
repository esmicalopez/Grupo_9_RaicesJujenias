const multer = require("multer")
const path = require("path")

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets/images/products")
    },
    filename: function (req, file, cb) {
        // const fileName = "product-img-" + Date.now() + path.extname(file.originalname)
        const fileName = file.originalname

        cb(null, fileName)
    }
})

const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assets/images/users")
    },
    filename: function (req, file, cb) {
        const fileName = "profile-img-" + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const uploadProduct = multer({ storage: storageProduct })
const uploadProfile = multer({ storage: storageProfile })

module.exports = {
    uploadProduct,
    uploadProfile
}
