const { check } = require("express-validator")

const loginValidator = [
    check("email")
        .trim()
        .notEmpty().withMessage("El email es un campo obligatorio.")
        .isLength({ max: 35 }).withMessage("El email puede tener como maximo 35 caracteres.")
        .isEmail().withMessage("Debe ser un formato de e-mail válido.")
        .escape(),

    check("password")
        .trim()
        .notEmpty().withMessage("La contraseña no puede estar vacia.")
]

module.exports = { loginValidator }
