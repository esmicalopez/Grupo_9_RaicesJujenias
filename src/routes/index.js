const express = require("express");
const router = express.Router()
const controllers = require("../controllers/indexController")
const { uploadProfle } = require("../middlewares/multerMid")

router.get("/", controllers.index)

module.exports = router