const { check } = require("express-validator")
const { userExists, imageValidator, passwordsMatch } = require("../validators/customValidators")

const registerValidator = [
    check("name")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio.")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres")
        .escape(),
    check("lastName")
        .trim()
        .notEmpty().withMessage("El apellido no puede estar vacio.")
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres")
        .escape(),
    check("email")
        .trim()
        .notEmpty().withMessage("El email es un campo obligatorio.")
        .isLength({ max: 35 }).withMessage("El email puede tener como maximo 35 caracteres.")
        .isEmail().withMessage("Debe ser un formato de e-mail válido.")
        .custom(userExists)
        .escape(),
    check("rol")
        .notEmpty().withMessage("Tienes que elejir un rol.")
        .escape(),
    check("profile-image")
        .custom(imageValidator),
    check("password")
        .trim()
        .notEmpty().withMessage("La contraseña no puede estar vacia.")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .custom(passwordsMatch).withMessage("Las contraseñas tienen que ser iguales"),
    check("terminos")
        .trim()
        .notEmpty().withMessage("Aceptar terminos y condiciones.")
        .escape()
]

module.exports = { registerValidator }
