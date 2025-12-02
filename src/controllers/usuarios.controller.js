const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/dbConnect");
const { queries } = require("../db/queries");

const createUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const existe = await pool.query(queries.findUserByEmail, [email]);

        if (existe.rows.length > 0) {
            return res
                .status(400)
                .json({ ok: false, message: "Usuario ya existe" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const result = await pool.query(queries.insertUser, [
            nombre,
            email,
            hashedPassword,
            "user",
        ]);

        const user = result.rows[0];
        const token = jwt.sign(
            { uid: user.id, nombre: user.nombre, rol: user.rol },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "12h" }
        );

        res.json({ ok: true, user, token, redirect: "/dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Error al crear usuario" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(queries.findUserByEmail, [email]);

        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.contrasena))) {
            return res
                .status(400)
                .json({ ok: false, message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { uid: user.id_usuario, nombre: user.nombre, rol: user.rol },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "12h" }
        );

        const redirect = user.rol === "admin" ? "/movies" : "/dashboard";

        res.json({ ok: true, token, redirect });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Error al iniciar sesión" });
    }
};

const renewToken = (req, res) => {
    const token = jwt.sign(
        {
            uid: req.tokenData.uid,
            nombre: req.tokenData.nombre,
            rol: req.tokenData.rol,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "12h" }
    );
    res.json({ ok: true, token });
};

module.exports = { createUser, loginUser, renewToken };
