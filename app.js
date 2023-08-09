const express = require("express");
const app = express();
const path = require("path");

// Se define el puerto a usar
const PORT = process.env.PORT || 3000;

// Archivos estáticos desde la carpeta "views"
app.use(express.static(path.join(__dirname, 'views')));

// Archivos estáticos desde la carpeta "assets"
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Para las solicitudes del sitio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'carrito.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'producto.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"))
});

// ...

// Iniciando el servidor en localhost:PORT
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});