const db = require("../database/models")

async function userLocals (req, res, next) {
    res.locals.userLogged = false
    if (req.session.userLogged) {
        const user = await db.User.findByPk(req.session.user, {
            include: ["rol"]
        })
        res.locals.userLogged = true
        res.locals.user = user
    }

    next()
}

module.exports = userLocals
