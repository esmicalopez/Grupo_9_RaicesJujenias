const usersList = require("../data/users.json")

function cookieLoggerMid(req, res, next) {
    if (req.cookies.cookieLogger) {
        let user = usersList.find((u) => u.id === +req.cookies.cookieLogger)
        req.session.user = user
        req.session.userLogged = true  
    }
    next()
}

module.exports = cookieLoggerMid