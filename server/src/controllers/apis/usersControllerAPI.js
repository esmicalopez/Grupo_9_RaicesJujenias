const userModel = require("../../models/apis/usersAPI")

const controllers = {
    list: async (req, res) => {
        try {
            const users = await userModel.list()
            return res.status(200).json({
                status: 200,
                count: users.length,
                message: "lista de usuarios",
                data: users
            })
        } catch (error) {
            res.json(error)
        }
    },
    detail: async (req, res) => {
        const { id } = req.params
        const user = await userModel.detail({ id })

        return res.status(200).json({
            status: 200,
            data: user
        })
    }

}

module.exports = controllers
