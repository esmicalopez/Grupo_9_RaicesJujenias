async function cookieLoggerMid (req, res, next) {
    if (req.cookies.cookieLogger) {
        req.session.user = req.cookies.cookieLogger
        req.session.userData = JSON.parse(req.cookies.userData)
        req.session.userLogged = true
    }
    next()
}

module.exports = cookieLoggerMid
