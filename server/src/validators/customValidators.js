const userModel = require("../models/users")
const db = require("../database/models")

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

const userExists = async (value, { req }) => {
    if (req.session.userData && req.session.userData.email === value) return true

    const user = await userModel.userExists({ email: value })

    if (user) {
        throw new Error("Este correo ya esta registrado.")
    }

    true
}

const colorExists = async (value, { req }) => {
    const color = await db.Color.findAll({
        where: {
            id: value
        }
    })

    if (!color) {
        throw new Error("Ingrese un color válido")
    }

    return true
}

const sizeExists = async (value, { req }) => {
    const size = await db.Size.findByPk(value)

    if (!size) {
        throw new Error("Ingrese un talle/tamaño válido")
    }

    return true
}

const categoryExists = async (value, { req }) => {
    const category = await db.Category.findByPk(value)

    if (!category) {
        throw new Error("Ingrese una categoría válida")
    }

    return true
}

module.exports = {
    passwordsMatch,
    imageValidator,
    userExists,
    colorExists,
    sizeExists,
    categoryExists
}
