// REQUERIMIENTOS DE TERCEROS
const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })

// REQUERIMIENTOS PROPIOS
const {
    validarCrearPelicula,
    validarEditarPelicula,
} = require("../validators/crud-admin.validator");
const { validarJWT } = require("../middlewares/validarJWT");

const { validarCampos } = require("../middlewares/validarCampos");

const { saveImageMiddleware} = require("../middlewares/uploadImage");
const { verificarRol } = require("../middlewares/verificarRol");

// FUNCIONES CONTROLADORAS
const {
    crearPelicula,
    editarPelícula,
    eliminarPelícula,
    obtenerTodasPeliculas,
    obtenerPeliculabyId,
} = require("../controllers/admin.controllers");

// MIDDLEWARES DE COMPROBACIÓN
//Comprobar año y nombre de película
const {
    comprobarNombreYAnioPelicula,
} = require("../middlewares/comprobarnombreanopelicula");

// CREAR PELÍCULA - /createMovie
router.post('/createmovie', upload.single('url_imagen'),[validarJWT, verificarRol("admin"), saveImageMiddleware,comprobarNombreYAnioPelicula, validarCrearPelicula, validarCampos], crearPelicula);

// OBTENER PELÍCULAS - /movies
router.get("/all", [validarJWT, verificarRol("admin")], obtenerTodasPeliculas);

// OBTENER PELÍCULA POR ID
router.get("/:id", [validarJWT, verificarRol("admin")], obtenerPeliculabyId);


router.get(
    "/editmovie/:id",
    [/* validarJWT, verificarRol("admin"), */ validarEditarPelicula, validarCampos],
    editarPelícula
);


// EDITAR PELÍCULA POR ID
router.put(
    "/editmovie/:id",
    [/* validarJWT, verificarRol("admin"), */ validarEditarPelicula, validarCampos],
    editarPelícula
);

// BORRAR PELÍCULA POR ID
router.delete(
    "/removemovie/:id",
    [validarJWT, verificarRol("admin")],
    eliminarPelícula
);

// EXPORTAR RUTAS
module.exports = router;
