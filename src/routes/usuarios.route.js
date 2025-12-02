const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validarJWT");
const { redireccionRol } = require("../middlewares/redireccionRol");
const { verificarRol } = require("../middlewares/verificarRol");
const {
    createUser,
    loginUser,
    renewToken,
    rutaMovie
} = require("../controllers/usuarios.controller");

router.get("/register", redireccionRol, (req, res) => res.render("register"));
router.post("/register", createUser);

router.get("/", redireccionRol, (req, res) => res.render("login"));
router.post("/login", loginUser);

router.post("/logout", (req, res) =>
    res.json({ ok: true, message: "Cierre de sesión exitoso" })
);

router.get("/renew", validarJWT, renewToken);

router.get("/dashboard", validarJWT, verificarRol("user"), (req, res) =>
    res.json({ ok: true, message: "Bienvenido a dashboard" })
);

router.get("/movies", validarJWT, rutaMovie);

module.exports = router;
