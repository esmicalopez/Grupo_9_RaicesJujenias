const express = require("express");
const router = express.Router()

const controllers = require("../controllers/usersController")
const { uploadProfle } = require("../middlewares/multerMid")

router.get("/login", controllers.login)
router.get("/registro", controllers.registerView)

router.post("/registro",  uploadProfle.single("profile-image"), controllers.register)


module.exports = router