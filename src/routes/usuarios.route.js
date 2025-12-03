const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validarJWT");
const { redireccionRol } = require("../middlewares/redireccionRol");
const { verificarRol } = require("../middlewares/verificarRol");
const {
    createUser,
    loginUser,
    renewToken,
    rutaMovie,
    deleteFavorito,
    addFavorito,
    busquedaPeliculas,
    buscarPeliculasById
} = require("../controllers/usuarios.controller");
const {
    validarRegistro,
    validarLogin,
} = require("../validators/auth.validator");
const { validarCampos } = require("../middlewares/validarCampos");

/**FORMULARIO ACCESO */
router.get("/register", redireccionRol, (req, res) => res.render("register"));
router.post("/register", [validarRegistro, validarCampos], createUser);

router.get("/", redireccionRol, (req, res) => res.render("login"));
router.post("/login", [validarLogin, validarCampos], loginUser);

router.post("/logout", (req, res) =>
    res.json({ ok: true, message: "Cierre de sesión exitoso" })
);
/**FIN FORMULARIO ACCESO */

/** USER*/

router.get("/renew", validarJWT, renewToken);

router.get("/dashboard", validarJWT, verificarRol("user"), (req, res) =>
    res.json({ ok: true, message: "Bienvenido a dashboard" })
);

/** FIN USER*/

/** FAVORITOS(MOVIES) USER */
router.get("/movies", validarJWT, rutaMovie);
router.delete("/movies/delete", validarJWT, deleteFavorito);
router.post("/movies/add", validarJWT, addFavorito);

router.get('/search', busquedaPeliculas);

router.get('/movies/detailsMovie', buscarPeliculasById);
/**FIN FAVORITOS(MOVIES) USER */

module.exports = router;
