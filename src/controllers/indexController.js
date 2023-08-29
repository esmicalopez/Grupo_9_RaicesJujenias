const controllers = {
    index: (req, res) => {
        res.render('index');
      },
    register: (req, res) => {
        res.render('registro');
      },
    login: (req, res) => {
        res.render("login")
      }
}

module.exports = controllers