const { validationResult, matchedData } = require("express-validator")
const userModel = require("../models/users")

const controllers = {

    list: async (req, res) => {
        const users = await userModel.list()
        return res.json({
            message: "lista de usuarios",
            users
        })
    },

    registerView: (req, res) => {
        if (req.session.userLogged) {
            return res.redirect("/")
        }
        return res.render("users/registro")
    },

    register: async (req, res) => {
        //  -- Express-validator
        const erroresExpressValidator = validationResult(req)
        const data = matchedData(req)
        console.log(data)
        if (!erroresExpressValidator.isEmpty()) {
            return res.render("users/registro", {
                errores: erroresExpressValidator.mapped()
            })
        }

        await userModel.register({ data: req.body, file: req.file })

        return res.redirect("/")
    },

    loginView: (req, res) => {
        if (req.session.userLogged) {
            return res.redirect("/")
        }
        return res.render("users/login")
    },

    login: async (req, res) => {
        const { email, password, rememberUser } = req.body

        //  -- Express-validator
        const erroresExpressValidator = validationResult(req)
        if (!erroresExpressValidator.isEmpty()) {
            return res.render("users/login", {
                errors: erroresExpressValidator.mapped(),
                old: req.body
            })
        }

        const { user, passwordCheck } = await userModel.login({ email, password })

        if (!user || !passwordCheck) {
            req.flash("error", "Credenciales incorrectas")
            return res.render("users/login", { errors: { msg: "Los datos enviados son incorrectos o incompatibles" }, old: req.body })
        }

        req.session.user = user.id
        req.session.userData = { rol: user.rol_id, email: user.email }
        req.session.userLogged = true
        rememberUser === "true" ? res.cookie("cookieLogger", user.id, { maxAge: 60000 * 60 * 24 * 7 }) : ""
        res.cookie("userData", JSON.stringify({ rol: user.rol_id, email: user.email }), { maxAge: 60000 * 60 * 24 * 7 })
        req.flash("success", `${user.name.charAt(0).toUpperCase() + user.name.slice(1)} ingresaste sesión con exito!  -  Rol: ${user.rol.name.charAt(0).toUpperCase() + user.rol.name.slice(1)}`)
        return res.redirect("/")
    },

    logout: (req, res) => {
        res.clearCookie("cookieLogger")
        req.session.destroy()
        res.redirect("/")
    },

    userProfile: async (req, res) => {
        if (!req.session.user) { // Unauthorized
            return res.redirect("/")
        }

        const user = await userModel.userProfile({ sessionUser: req.session.user })
        res.render("users/userProfile", { user, rol: req.session.userData.rol })
    },

    userEdit: async (req, res) => {
        //  -- Express-validator
        const erroresExpressValidator = validationResult(req)
        if (!erroresExpressValidator.isEmpty()) {
            return res.render("users/userProfile", {
                errors: erroresExpressValidator.mapped(),
                user: req.body,
                rol: req.session.userData.rol
            })
        }
        await userModel.userEdit({ file: req.file, sessionUser: req.session.user, data: req.body })

        return res.redirect("/")
    },

    userPassword: async (req, res) => {
        if (!req.session.user) { // Unauthorized
            return res.redirect("/")
        }

        const user = userModel.userPassword({ sessionUser: req.session.user })

        res.render("users/userPassword", { user })
    },

    userEditPassword: async (req, res) => {
        const { password, oldPassword } = req.body

        const passwordCheck = await userModel.passwordCheck({ userId: req.session.user, oldPassword })

        if (!passwordCheck) {
            return res.render("users/userPassword", { errors: { msg: "Contraseña Incorrecta" }, old: req.body })
        }

        //  validacion contraseñas
        const erroresExpressValidator = validationResult(req)
        console.log("Errores: ")
        console.log(erroresExpressValidator.mapped())

        if (!erroresExpressValidator.isEmpty()) {
            return res.render("users/userPassword", {
                errores: erroresExpressValidator.mapped()
            })
        }

        await userModel.userEditPassword({ userId: req.session.user, password })

        return res.redirect("/")
    }
}

module.exports = controllers
