const fs = require("fs")
const path = require("path")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");

const users = require("../data/users.json");
const { resourceLimits } = require("worker_threads");

const controllers = {

    registerView: (req, res) => {
        if (req.session.userLogged) {
            return res.redirect("/")
        }
        return res.render('users/registro');
    },

    register: (req, res) => {

        const file = req.file ?? {};
        const userId = users[users.length - 1].id;

        //  validacion contraseñas
        const erroresExpressValidator  = validationResult(req);
        console.log("Errores: ")
        console.log(erroresExpressValidator.mapped())

        if (!erroresExpressValidator.isEmpty()) {
            return res.render("users/registro", { 
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
            avatar: file.filename ?? "default.png",
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

    loginView: (req, res) => {
        if (req.session.userLogged) {
            return res.redirect("/")
        }
        return res.render("users/login")
    },

    login: (req, res) => {
        const user = users.find((u) => u.email === req.body.email)
        // console.log(req.body)

        if(user){
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.userLogged = true  
                req.session.user = user
                req.body.rememberUser === "true" ? res.cookie("cookieLogger", req.session.user.id, { maxAge: 60000 * 60 * 24 * 7 }) : "";
                req.flash('success', `${user.name.charAt(0).toUpperCase() + user.name.slice(1)} ingresaste sesión con exito!`);
                return res.redirect("/")
            }
            return res.render("users/login", {errors: { msg: "Los datos enviados son incorrectos o incompatibles"}, old: req.body })

        } else{
            req.flash('error', 'Credenciales incorrectas');
            return res.render("users/login", {errors: { msg: "Los datos enviados son incorrectos o incompatibles"}, old: req.body })
        }
    },

    logout: (req, res) => {
        res.clearCookie("cookieLogger");
        req.session.destroy();
        res.redirect("/")
    },

    userProfile: (req, res) => {
        if (!req.session.user) { // Unauthorized
            return res.sendStatus(401)
        } 

        const { id, username } = req.params

        const user = users.find(u => u.id === +id && u.name === username)

        console.log("hola")
        console.log(res.locals)
        res.render("users/userProfile")
    }


}

module.exports = controllers