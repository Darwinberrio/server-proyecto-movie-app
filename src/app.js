//IMPORTACIONES de MODULOS externos
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//IMPORTACIONES locales
const app = express();
const usuariosRouter = require("./routes/usuarios.route");
const port = process.env.PORT;

//MIDDLEWARE
app.use(cors());

app.use(cookieParser());

//ayuda a leer el body de las peiticiones en formato JSON
app.use(express.json());

//parse application/X-ww-form-urlencoded
// Parsea datos de formularios (POST) hacia req.body.
app.use(express.urlencoded());


//Templates
app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");


//middleware
app.use(express.static(__dirname + "/public"))

/* RUTAS */

app.use('/',usuariosRouter);

// Rutas de usuarios
// app.use('/usuarios', require('./routes/usuarios.route'));

//listener
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});
