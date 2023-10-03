function userLocals(req, res, next) {
    if (req.session.userLogged) {
        //console.log(req.session.user);
        res.locals.user = req.session.user
        res.locals.userLogged = true
    } else{
        res.locals.userLogged = false
    }
    next()
}

module.exports = userLocals