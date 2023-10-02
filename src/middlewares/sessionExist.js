function sessionExist(req, res, next) {
    let userSession = req.session.email
    if (userSession) {
        res.redirect("/")
    }
    next()
}

module.exports = sessionExist