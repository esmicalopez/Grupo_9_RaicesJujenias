const express = require("express")

const controllers = require("../controllers/usersController")
const { uploadProfile } = require("../middlewares/multerMid")
const { registerValidator } = require("../middlewares/registerValidation")
const { loginValidator } = require("../middlewares/loginValidation")
const { editUserValidator, editUserPasswordValidator } = require("../middlewares/editUserValidation")

const router = express.Router()

router.get("/users/list", controllers.list) // borrar
router.get("/login", controllers.loginView)
router.get("/registro", controllers.registerView)
router.get("/profile", controllers.userProfile)
router.get("/profile/password", controllers.userPassword)

router.post("/login", loginValidator, controllers.login)
router.post("/logout", controllers.logout)
router.post("/registro", uploadProfile.single("profile-image"), registerValidator, controllers.register)

router.put("/profile", uploadProfile.single("profile-image"), editUserValidator, controllers.userEdit)
router.put("/profile/password", uploadProfile.single("profile-image"), editUserPasswordValidator, controllers.userEditPassword)

module.exports = router
