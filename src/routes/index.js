const express = require("express");
const router = express.Router()

const controllers = require("../controllers/indexController")

router.get("/", controllers.index)
router.get("/login", controllers.login)
router.get("/registro", controllers.register)

module.exports = router