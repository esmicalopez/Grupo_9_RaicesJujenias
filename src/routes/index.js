const express = require("express");
const router = express.Router()

let controllers = require("../controllers/indexController")

router.get("/", controllers.index)
router.get("/login", controllers.login)
router.get("/register", controllers.register)

module.exports = router