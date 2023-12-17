const db = require("../../database/models")

const userModel = {
    list: async () => {
        const usersRaw = await db.User.findAll({
            attributes: ["id", "name", "lastName", "email"]
        })

        const users = []
        for (const user of usersRaw) {
            users.push({
                user,
                detail: `/api/users/${user.id}`
            })
        }
        return users
    },

    detail: async ({ id }) => {
        const userRaw = await db.User.findByPk(id, {
            attributes: ["id", "name", "lastName", "email", "preference_id", "avatar"]
        })

        const user = {
            id: userRaw.id,
            name: userRaw.name,
            lastName: userRaw.lastName,
            email: userRaw.email,
            preference_id: userRaw.preference_id,
            avatar: {
                name: userRaw.avatar,
                url: `/images/users/${userRaw.avatar}`
            }
        }

        return user
    }
}

module.exports = userModel
