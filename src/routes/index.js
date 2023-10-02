const express = require("express");
const router = express.Router()

const controllers = require("../controllers/indexController");
const sessionExist = require("../middlewares/sessionExist");



router.get("/", controllers.index)

router.get("/login", sessionExist, controllers.login)
router.post("/login", controllers.loginPost)

router.get("/registro", sessionExist, controllers.register)

module.exports = router