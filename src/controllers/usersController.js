const { validationResult } = require("express-validator")
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
        //  validacion contraseñas
        const erroresExpressValidator = validationResult(req)
        console.log("Errores: ")
        console.log(erroresExpressValidator.mapped())

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

        const { user, passwordCheck } = await userModel.login({ email, password })

        if (!user || !passwordCheck) {
            req.flash("error", "Credenciales incorrectas")
            return res.render("users/login", { errors: { msg: "Los datos enviados son incorrectos o incompatibles" }, old: req.body })
        }

        req.session.user = user.id
        req.session.userLogged = true
        rememberUser === "true" ? res.cookie("cookieLogger", user.id, { maxAge: 60000 * 60 * 24 * 7 }) : ""
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

        res.render("users/userProfile", { user })
    },

    userEdit: async (req, res) => {
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
        console.log(req.body)
        console.log(req.session.user)

        //  validacion contraseñas
        const erroresExpressValidator = validationResult(req)
        console.log("Errores: ")
        console.log(erroresExpressValidator.mapped())

        if (!erroresExpressValidator.isEmpty()) {
            console.log("falso")
            return res.render("users/userPassword", {
                errores: erroresExpressValidator.mapped()
            })
        }

        const { oldPasswordCheck } = await userModel.userEditPassword({ sessionUser: req.session.user, password, oldPassword })

        if (!oldPasswordCheck) {
            return res.render("users/userPassword", { errors: { msg: "Los datos enviados son incorrectos o incompatibles" }, old: req.body })
        }

        return res.redirect("/")
    }
}

module.exports = controllers
