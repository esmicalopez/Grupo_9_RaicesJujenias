async function cookieLoggerMid (req, res, next) {
    if (req.cookies.cookieLogger) {
        req.session.user = req.cookies.cookieLogger
        req.session.userLogged = true
    }
    next()
}

module.exports = cookieLoggerMid
