const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const { promisify } = require("util")

const unlinkAsync = promisify(fs.unlink)

const db = require("../database/models/") // aca tmb
const userModel = require("../models/users")
const controllers = {

    list: async (req, res) => { // borrar - prueba de conexion a la BD
        const users = await db.User.findAll()
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
        const file = req.file
        const user = await db.User.findByPk(req.session.user)

        if ((file !== undefined && user.avatar) && fs.existsSync(__dirname + "../../../assets/images/users/" + user.avatar)) {
            if (user.avatar !== "defaultAvatar.png") {
                await unlinkAsync(__dirname + "../../../assets/images/users/" + user.avatar)
            }
            await db.User.update({
                avatar: file.filename
            }, {
                where: { id: user.id }
            })
        }

        await db.User.update({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email
        }, {
            where: { id: user.id }
        })

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
        const user = await db.User.findByPk(req.session.user)

        const oldPassword = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!oldPassword) {
            return res.render("users/userPassword", { errors: { msg: "Los datos enviados son incorrectos o incompatibles" }, old: req.body })
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

        const passwordHashed = await bcrypt.hash(req.body.password, 10)

        await db.User.update({
            password: passwordHashed
        }, {
            where: { id: user.id }
        })

        return res.redirect("/")
    }
}

module.exports = controllers
