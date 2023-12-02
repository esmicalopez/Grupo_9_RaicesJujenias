const { check } = require("express-validator")
const userModel = require("../models/users")

const passwordsMatch = (value, { req }) => {
    if (value !== req.body.confirmPassword) {
        throw new Error("Las contraseñas no coinciden")
    }
    return true
}

const imageValidator = (value, { req }) => {
    if (req.file) {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"]

        const fileExtension = req.file.originalname.split(".").pop().toLowerCase()

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Imagenes permitidas: JPG, JPEG, PNG, GIF")
        }
    }

    return true
}

const userExists = async value => {
    const user = await userModel.userExists({ email: value })

    if (user) {
        throw new Error("Este correo ya esta registrado.")
    }

    true
}

const validator = [
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

module.exports = { validator }
