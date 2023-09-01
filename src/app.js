const express = require("express");
const app = express();

const indexRoutes = require("./routes/index")
const carritoRoutes = require("./routes/carrito")
const productoRoutes = require("./routes/producto")

// Se define el puerto a usar
const PORT = process.env.PORT || 3000;

// Archivos estáticos desde la carpeta "views"
app.set("view engine", "ejs")
app.set("views", "./src/views")


// Archivos estáticos desde la carpeta "assets"
app.use(express.static('assets'));

// Para las solicitudes del sitio
app.use('/', indexRoutes);  //Index, Login, Register

app.use('/carrito', carritoRoutes);

app.use('/productos', productoRoutes);


// ...

// Iniciando el servidor en localhost:PORT
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});