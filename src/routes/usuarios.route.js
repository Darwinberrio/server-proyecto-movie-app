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
    busquedaPeliculas
} = require("../controllers/usuarios.controller");


/**FORMULARIO ACCESO */
router.get("/register", redireccionRol, (req, res) => res.render("register"));
router.post("/register", createUser);

router.get("/", redireccionRol, (req, res) => res.render("login"));
router.post("/login", loginUser);

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
/**FIN FAVORITOS(MOVIES) USER */


module.exports = router;
