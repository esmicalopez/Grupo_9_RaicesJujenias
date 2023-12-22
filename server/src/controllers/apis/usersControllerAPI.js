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

        if (!user) {
            return res.status(404).json({
                error: {
                    msg: "usuario no encontrado",
                    status: 404
                }
            })
        }

        return res.status(200).json({
            status: 200,
            data: user
        })
    }

}

module.exports = controllers
