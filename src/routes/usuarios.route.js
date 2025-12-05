// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { validarJWT } = require("../middlewares/validarJWT");
const { verificarRol } = require("../middlewares/verificarRol");
const {
    createUser,
    loginUser,
    renewToken,
    getAllFavoritos,
    deleteFavorito,
    addFavorito,
    busquedaPeliculas,
    buscarPeliculasById,
} = require("../controllers/usuarios.controller");
const {
    validarRegistro,
    validarLogin,
} = require("../validators/auth.validator");
const { validarCampos } = require("../middlewares/validarCampos");

// RUTAS
/**FORMULARIO ACCESO */
router.post("/signup", [validarRegistro, validarCampos], createUser);

router.post("/login", [validarLogin, validarCampos], loginUser);



/**FIN FORMULARIO ACCESO */

/** USER*/

router.get("/renew", validarJWT, renewToken);

router.get("/dashboard", validarJWT, verificarRol("user"), (req, res) =>
    res.json({ ok: true, message: "Bienvenido a dashboard" })
);

/** FIN USER*/

/** FAVORITOS(MOVIES) USER */
router.get("/movies", validarJWT, verificarRol("user"), getAllFavoritos);
router.delete(
    "/movies/delete",
    validarJWT,
    verificarRol("user"),
    deleteFavorito
);
router.post("/movies/add", validarJWT, verificarRol("user"), addFavorito);

router.get("/search", validarJWT, verificarRol("user"), busquedaPeliculas);

router.get(
    "/movies/detailsMovie",
    validarJWT,
    verificarRol("user"),
    buscarPeliculasById
);
/**FIN FAVORITOS(MOVIES) USER */

// EXPORTAR RUTAS
module.exports = router;
