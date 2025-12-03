const { check } = require("express-validator");

const validarRegistro = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2 })
        .withMessage("El nombre debe tener al menos 2 caracteres"),

    check("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Formato de email inválido"),

    check("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener mínimo 6 caracteres"),
];

const validarLogin = [
    check("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Formato de email inválido"),

    check("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

module.exports = {
    validarRegistro,
    validarLogin,
};
