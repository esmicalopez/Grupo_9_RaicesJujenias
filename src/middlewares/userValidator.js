const { check } = require("express-validator")

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

module.exports = { validator }
