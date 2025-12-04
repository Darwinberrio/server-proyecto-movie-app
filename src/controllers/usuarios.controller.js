// EXPORTACIONES DE TERCEROS
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/dbConnect");

// EXPORTACIONES PROPIAS
const { queries } = require("../db/queries");

//FORMULARIO ACCESO
/**
 * Función que crea nuevos usuarios User
 * @param {Object} req
 * @param {Object} res
 * @returns Promise - Crea nuevos usuarios User o devuelve errores (500 o 400)
 */
const createUser = async (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({
                ok: false,
                message: "Las contraseñas no coinciden",
            });
        }

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

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000,
        });

        res.json({ ok: true, user, token, redirect: "/dashboard" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Error al crear usuario" });
    }
};

/**
 * Función que permite a un usuario iniciar sesión
 * @param {Object} req
 * @param {Object} res
 * @returns Promise - Los usuarios ya registrados pueden iniciar sesión o devuelve errores (500 o 400)
 */
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

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000,
        });

        return res.json({ ok: true, redirect });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Error al iniciar sesión" });
    }
};

/**
 * Función que renueva el token de un usuario autenticado
 * @param {Object} req
 * @param {Object} res
 * @returns Renovación del token
 */
const renewToken = (req, res) => {
    try {
        const token = jwt.sign(
            {
                uid: req.tokenData.uid,
                nombre: req.tokenData.nombre,
                rol: req.tokenData.rol,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "12h" }
        );

        res.json({
            ok: true,
            token,
            rol: req.tokenData.rol,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Error renovando token" });
    }
};

//FORMULARIO ACCESO

//MOVIES USER

/**
 * Funcion que obtiene todos las peliculas favoritas de un usuario
 * @param {} req requerimiento
 * @param {*} res respuesta
 * @returns respuesta exito 200 con array de peliculas favoritas o error 500 si el usuario no tiene peliculas favoritas
 */
const getAllFavoritos = async (req, res) => {
    try {
        //captura token almacenado en cookies o header
        const token =
            req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

        //VER TOKEN
        //console.log(token)

        //VERIFICAR TOKEN Y EXTRAER ID USUARIO
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //COMPROBAR UID
        //console.log(uid);

        //get favoritos by ID usuario
        const resultFavoritos = await pool.query(queries.favoritosByUserId, [
            uid,
        ]);

        if (resultFavoritos.rowCount === 0) {
            return res.status(404).json({
                //404 NOT FOUND. El servidor no pudo encontrar el contenido solicitado
                ok: false,
                msg: "No tienes favoritos guardados",
            });
        }

        return res.status(200).json({
            ok: true,
            msg: "Favoritos de usuario encontrados",
            favoritos: resultFavoritos.rows,
            // token:token
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Funcion que elimina un favorito recibido por formulario
 * @param {} req requerimiento
 * @param {*} res respuesta
 * @returns respuesta de exito 200 o error 404 si no existe el favorito a borrar
 */
const deleteFavorito = async (req, res) => {
    try {
        //captura token almacenado en cookies o header
        const token =
            req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

        //ver token en consola
        //console.log(token)

        //VERIFICAR TOKEN Y EXTRAER ID USUARIO para usarlo en el delete
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //ver ID_usuario en consola
        console.log("UID usuario:", uid);

        //captura id favorito que llega por BODY(formulario)
        const id_favorito = req.body.id_favorito;

        //ver id favorito en consola
        console.log("ID favorito:", id_favorito);

        const favoritoByFavoritoId = await pool.query(
            queries.findfavoritoByFavoritoId2,
            [uid, id_favorito]
        );

        console.log(favoritoByFavoritoId.rowCount);
        if (favoritoByFavoritoId.rowCount === 0) {
            return res.status(404).json({
                //404 NOT FOUND. El servidor no pudo encontrar el contenido solicitado
                ok: false,
                msg: "Pelicula a borrar no existe en tus  favoritos",
            });
        }
        //DELETE favoritos by ID usuario y ID favorito
        const deleteFavorito = await pool.query(queries.deleteFavorito, [
            uid,
            id_favorito,
        ]);

        //imprime por consola el objeto borrado en la base de datos
        console.log(favoritoByFavoritoId.rows);

        return res.status(200).json({
            ok: true,
            msg: "Pelicula borrada correctamente",
            favoritoBorrado: favoritoByFavoritoId.rows,
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Funcion que añade un favorito recibido por formulario
 * @param {*} req requerimiento
 * @param {*} res respuesta
 * @returns respuesta de exito 200 o error 404 si la pelicula a añadir ya existe como favorita
 */
const addFavorito = async (req, res) => {
    try {
        //captura token almacenado en cookies o header
        const token =
            req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

        //ver token en consola
        //console.log(token)

        //VERIFICAR TOKEN Y EXTRAER ID USUARIO para usarlo en el delete
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //ver ID_usuario en consola
        //console.log("UID usuario:",uid);

        //captura id favorito que llega por BODY(formulario)
        const id_pelicula = req.body.id_pelicula;

        //ver id favorito en consola
        //console.log("ID pelicula:",id_pelicula)

        //comprobacion para ver si el id existe
        const findPeliculaById = await pool.query(queries.findPeliculabyId, [
            id_pelicula,
        ]);

        if (findPeliculaById.rowCount === 0) {
            return res.status(404).json({
                //404 NOT FOUND. El servidor no pudo encontrar el contenido solicitado
                ok: false,
                msg: "La pelicula a guardar no existe",
            });
        }

        const findfavoritoByFavoritoId = await pool.query(
            queries.findfavoritoByFavoritoId,
            [uid, id_pelicula]
        );

        //comprobar si la pelicula ya existe en favoritos
        //console.log(findfavoritoByFavoritoId.rowCount)

        if (findfavoritoByFavoritoId.rowCount == 1) {
            return res.status(406).json({
                //406 NOT ACCEPTABLE. El servidor no puede procesar la solicitud debido a algo que es percibido como un error del cliente
                ok: false,
                msg: "La pelicula ya existe en tus favoritos",
            });
        }

        //AÑADE favoritos
        const addFavorito = await pool.query(queries.addFavorito, [
            uid,
            id_pelicula,
        ]);

        //imprime por consola el objeto borrado en la base de datos
        console.log(addFavorito.rows);

        return res.status(200).json({
            ok: true,
            msg: "Pelicula añadida correctamente a tus favoritos",
            favorito: findPeliculaById.rows,
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
};
//FIN MOVIES

/**
 * Función que busca películas por nombre
 * @param {Object} req
 * @param {Object} res
 * @returns Promise - Busca películas por nombre y devuelve resultados o errores (500 o 404)
 */
const busquedaPeliculas = async (req, res) => {
    try {
        const token =
            req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

        // Consulta SQL para obtener todas las películas
        const titulo = req.body.titulo;
        const { rowCount, rows } = await pool.query(queries.searchPelicula, [
            `${titulo}%`,
        ]);

        if (rowCount === 0) {
            return res.status(404).json({
                //404 NOT FOUND. El servidor no pudo encontrar el contenido solicitado
                ok: false,
                msg: "No hemos encontrado ninguna pelicula con ese nombre",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "pelicula encontrada",
            peliculas: rows,
            token: token,
        });
    } catch (error) {
        // Muestra el error en consola y responde con un error 500
        console.log(error);
        res.status(500).json({ error: "Error al obtener las películas" });
    }
};

/**
 * Función que busca películas por ID
 * @param {Object} req
 * @param {Object} res
 * @returns Promise - Busca películas por ID y devuelve resultados o errores (500 o 404)
 */
const buscarPeliculasById = async (req, res) => {
    try {
        const token =
            req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

        // Consulta SQL para obtener todas las películas
        const id_pelicula = req.body.id_pelicula;
        const findPeliculaById = await pool.query(queries.findPeliculabyId, [
            id_pelicula,
        ]);

        if (findPeliculaById.rowCount === 0) {
            return res.status(404).json({
                //404 NOT FOUND. El servidor no pudo encontrar el contenido solicitado
                ok: false,
                msg: "Los detalles de esta pelicula no existen",
            });
        }

        const { rowCount, rows } = await pool.query(queries.detalleById, [
            id_pelicula,
        ]);

        return res.status(200).json({
            ok: true,
            msg: "Pelicula encontrada",
            pelicula: rows,
            token: token,
        });
    } catch (error) {
        // Muestra el error en consola y responde con un error 500
        console.log(error);
        res.status(500).json({ error: "Error al obtener las películas" });
    }
};

// EXPORTAR FUNCIONES CONTROLADORAS
module.exports = {
    createUser,
    loginUser,
    renewToken,
    getAllFavoritos,
    deleteFavorito,
    addFavorito,
    busquedaPeliculas,
    buscarPeliculasById,
};
