const fs = require("fs")
const path = require("path")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const users = require("../data/users.json")

const controllers = {

    registerView: (req, res) => {
        res.render('registro');
    },

    register: (req, res) => {

        const file = req.file;
        const userId = users[users.length - 1].id;

        //  validacion contraseñas
        const erroresExpressValidator  = validationResult(req);
        console.log("Errores: ")
        console.log(erroresExpressValidator.mapped())

        if (!erroresExpressValidator.isEmpty()) {
            return res.render("registro", { 
                errores: erroresExpressValidator.mapped() 
            });
        } else {}
        const passwordHashed = bcrypt.hashSync(req.body.password, 10)


        const newUser = {
            id: userId + 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHashed,
            registerDate: "hoy",
            date: req.body.date,
            rol: req.body.userRole,
            avatar: file.filename,
            acceptTerms: true,
            info_contact: {
                address: "",
                phone: ""
            },
            preferences: {
                language: "español",
                notifications: true
            }
        }
        // console.log("DATOS FORM: ")
        console.log(req.body);


        users.push(newUser);

        fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4));

        res.redirect("/")
},

    login: (req, res) => {
        res.render("login")
    }
}

module.exports = controllers