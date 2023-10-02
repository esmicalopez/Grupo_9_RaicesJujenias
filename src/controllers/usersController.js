const controllers = {

    registerView: (req, res) => {
        res.render('registro');
    },

    register: (req, res) => {
        const body = req.body
        const file = req.file;
        console.log(file.filename)
        console.log(body)

        res.redirect("/")
    },

    login: (req, res) => {
        res.render("login")
    }
}

module.exports = controllers