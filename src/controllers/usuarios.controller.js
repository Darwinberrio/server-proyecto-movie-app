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

        console.log(result.rows);
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

const getAllFavs=async(req,res)=>{

    try {

        //CAPTURA TOKEN ALMACENADO EN COOKIES!!
        const token =req.cookies.token; 
        
        console.log(token)
        //const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log(id);

        //get favoritos by ID usuario
        const resultFavoritos=await pool.query(queries.favoritosByID,[id]);
        //console.log(resultFavoritos.rows);

        return res.status(200).json({
            ok:true,
            msg:'Favoritos de usuario encontrados',
            user:userExists,
            favoritos:resultFavoritos.rows
            //token:token
        })

    } catch (error) {
        console.log(error)
    }   
} 

const rutaMovie = (req, res) => {
    const rol = req.tokenData.rol;
    if (rol === "admin") {
        res.status(200).json({ok: true, message: "en movie como admin"});
    }
    if (rol === "user") {
        getAllFavs(req, res);
    }
    //return res.status(403).json({ ok: false, message: "Acceso denegado" });
};

const busquedaPeliculas = async (req, res) => {
    try {
        // Consulta SQL para obtener todas las películas
        const query = 'SELECT titulo FROM peliculas';
        // Ejecuta la consulta y obtiene los resultados
        const { rows } = await pool.query(query);
        // Responde con las películas en formato JSON
        res.json({ peliculas : rows });
    } catch (error) {
        // Muestra el error en consola y responde con un error 500
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

module.exports = { createUser, loginUser, renewToken,getAllFavs,rutaMovie, busquedaPeliculas};
