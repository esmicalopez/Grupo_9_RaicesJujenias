const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("express-flash")
const cors = require("cors")

const indexRoutes = require("./routes/index")
const carritoRoutes = require("./routes/carrito")
const productoRoutes = require("./routes/producto")
const usersRoutes = require("./routes/users")

// APIs
const productRoutesAPI = require("./routes/apis/product")
const userRoutesAPI = require("./routes/apis/user")

const cookieLoggerMid = require("./middlewares/cookieLoggerMid")
const userLocals = require("./middlewares/userLocals")

// Se define el puerto a usar
const PORT = process.env.PORT || 3000

// Archivos estáticos desde la carpeta "views"
app.set("view engine", "ejs")
app.set("views", "./src/views")

// Archivos estáticos desde la carpeta "assets"
app.use(express.static("assets"))

// Middlewares globales
app.use(session({
    secret: "djklfabsodbfdsikjñp",
    saveUninitialized: true,
    resave: false
}))
app.use(methodOverride("_method"))
app.use(cookieParser())
app.use(cookieLoggerMid)
app.use(userLocals)
app.use(flash())
app.use(cors())

// Configurando express para usar metodo POST, PUT y DELETE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Para las solicitudes del sitio
app.use("/", indexRoutes) // Index

app.use("/", usersRoutes) // Login, Register

app.use("/carrito", carritoRoutes)

app.use("/productos", productoRoutes)

// Solicitudes de APIs

app.use("/api/products", productRoutesAPI)
app.use("/api/users", userRoutesAPI)

// Iniciando el servidor en localhost:PORT
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})
