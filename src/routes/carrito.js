const express = require("express");
const router = express.Router()

const controllers = require("../controllers/carritoController")

router.get("/", controllers.carrito)

module.exports = router