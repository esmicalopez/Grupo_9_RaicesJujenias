const db = require("../database/models/")

const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const { promisify } = require("util")

const unlinkAsync = promisify(fs.unlink)

const userModel = {

    list: async (req, res) => { // borrar - prueba de conexion a la BD
        const users = await db.User.findAll()
        return res.json({
            message: "lista de usuarios",
            users
        })
    },

    register: async ({ data, file }) => {
        const fileValue = file ?? {}
        const { name, lastName, email, password, rol } = data

        const passwordHashed = bcrypt.hashSync(password, 10)

        const user = await db.User.create({
            name,
            lastName,
            email,
            password: passwordHashed,
            avatar: fileValue.filename ?? "defaultAvatar.png",
            rol_id: Number(rol),
            preference_id: 2
        })

        return user
    },

    login: async ({ email, password }) => {
        const user = await db.User.findOne({
            where: {
                email
            },
            include: ["rol"]
        })

        if (!user) return false

        const passwordCheck = bcrypt.compareSync(password, user.password)
        return { user, passwordCheck }
    },

    userProfile: async ({ sessionUser }) => {
        const user = await db.User.findByPk(sessionUser, {
            include: ["rol"]
        })

        return user
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

    userPassword: async ({ sessionUser }) => {
        const user = await db.User.findByPk(sessionUser)

        return user
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

module.exports = userModel
