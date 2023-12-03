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

const userExists = async (value, { req }) => {
    if (req.session.userData && req.session.userData.email === value) return true

    const user = await userModel.userExists({ email: value })

    if (user) {
        throw new Error("Este correo ya esta registrado.")
    }

    true
}

module.exports = {
    passwordsMatch,
    imageValidator,
    userExists
}
