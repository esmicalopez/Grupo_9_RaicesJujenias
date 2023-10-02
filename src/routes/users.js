const express = require("express");
const { check } = require("express-validator")

const controllers = require("../controllers/usersController")
const { uploadProfile } = require("../middlewares/multerMid")

const router = express.Router()

const passwordsMatch = (value, { req }) => {
    if (value !== req.body.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
    }
    return true;
};

const validator = [
    check("password")
        .notEmpty().withMessage("El email no puede estar vacio.")
        .custom(passwordsMatch).withMessage("Las contraseñas tienen que ser iguales")
]

router.get("/login", controllers.login)
router.get("/registro", controllers.registerView)

router.post("/registro", uploadProfile.single("profile-image"), validator, controllers.register)


module.exports = router