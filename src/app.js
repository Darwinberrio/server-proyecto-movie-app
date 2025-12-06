//IMPORTACIONES de MODULOS externos
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

//IMPORTACIONES locales
const app = express();
const usuariosRouter = require("./routes/usuarios.route");
const adminRouter = require("./routes/admin.route");
const port = process.env.PORT;

//MIDDLEWARE
app.use(cors());

app.use(cookieParser());

//ayuda a leer el body de las peiticiones en formato JSON
app.use(express.json());

//parse application/X-ww-form-urlencoded
// Parsea datos de formularios (POST) hacia req.body.
app.use(express.urlencoded());

// Rutas
app.use("/", usuariosRouter);
app.use("/movies", adminRouter);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Templates
app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");


//middleware
app.use(express.static(__dirname + "/../public"))

//listener
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});
