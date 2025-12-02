const queries = {
    favoritosByID:
        "SELECT peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1",

    findUserbyID: "SELECT * FROM usuarios WHERE id_usuario=$1",

    // Queries usadas en usuarios.controller
    findUserByEmail: "SELECT * FROM usuarios WHERE email=$1",
    insertUser:
        "INSERT INTO usuarios(nombre, email, contrasena, rol) VALUES($1, $2, $3, $4) RETURNING id_usuario, nombre, rol",
    // Fin de queries usadas en usuarios.controller
};

module.exports = { queries };
