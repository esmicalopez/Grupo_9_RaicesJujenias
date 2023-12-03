const db = require("../database/models/")
const bcrypt = require("bcryptjs")

const fs = require("fs")
const { promisify } = require("util")
const unlinkAsync = promisify(fs.unlink)

const userModel = {

    list: async () => {
        const users = await db.User.findAll()
        return users
    },

    userExists: async ({ email }) => {
        const user = await db.User.findOne({
            where: {
                email
            }
        })

        return user
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

    userEdit: async ({ file, sessionUser, data }) => {
        const { name, lastName, email } = data

        const user = await db.User.findByPk(sessionUser)

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
            name,
            lastName,
            email
        }, {
            where: { id: user.id }
        })

        return user
    },

    userPassword: async ({ sessionUser }) => {
        const user = await db.User.findByPk(sessionUser)

        return user
    },

    passwordCheck: async ({ userId, oldPassword }) => {
        const user = await db.User.findByPk(userId)

        return await bcrypt.compare(oldPassword, user.password)
    },

    userEditPassword: async ({ userId, password }) => {
        const passwordHashed = await bcrypt.hash(password, 10)

        const userEdit = await db.User.update({
            password: passwordHashed
        }, {
            where: { id: userId }
        })
        return userEdit
    }
}

module.exports = userModel
