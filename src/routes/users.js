const express = require("express")

const controllers = require("../controllers/usersController")
const { uploadProfile } = require("../middlewares/multerMid")
const { validator } = require("../middlewares/userValidator")

const router = express.Router()

router.get("/users/list", controllers.list) // borrar
router.get("/login", controllers.loginView)
router.get("/registro", controllers.registerView)
router.get("/profile", controllers.userProfile)
router.get("/profile/password", controllers.userPassword)

router.post("/login", controllers.login)
router.post("/logout", controllers.logout)
router.post("/registro", uploadProfile.single("profile-image"), validator, controllers.register)

router.put("/profile", uploadProfile.single("profile-image"), controllers.userEdit)
router.put("/profile/password", uploadProfile.single("profile-image"), validator, controllers.userEditPassword)

module.exports = router
