const express = require("express");
const router = express.Router()

let controllers = require("../controllers/carritoController")

router.get("/", controllers.carrito)

module.exports = router