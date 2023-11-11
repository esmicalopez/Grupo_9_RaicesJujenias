const express = require("express")
const { check } = require("express-validator")

const controllers = require("../controllers/usersController")
const { uploadProfile } = require("../middlewares/multerMid")

const router = express.Router()

const passwordsMatch = (value, { req }) => {
    if (value !== req.body.confirmPassword) {
        throw new Error("Las contraseñas no coinciden")
    }
    return true
}

const validator = [
    check("password")
        .notEmpty().withMessage("La contraseña no puede estar vacia.")
        .custom(passwordsMatch).withMessage("Las contraseñas tienen que ser iguales")
]

router.get("/users/list", controllers.list) // borrar
router.get("/login", controllers.loginView)
router.get("/registro", controllers.registerView)
router.get("/profile", controllers.userProfile)
router.get("/profile/password", controllers.userPassword)

router.post("/login", controllers.login)
router.post("/logout", controllers.logout)
router.post("/registro", uploadProfile.single("profile-image"), validator, controllers.register)

module.exports = router
