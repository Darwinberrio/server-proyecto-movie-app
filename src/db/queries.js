// QUERIES
/**
 * Queries para la base de datos
 */
const queries = {

    //Queries favoritos
    favoritosByUserId:"SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.id_pelicula as id_pelicula, peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1",

    findUserbyID:'SELECT * FROM usuarios WHERE id_usuario=$1',

    findfavoritoByFavoritoId:"SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1 AND favoritos.id_pelicula=$2",

    findfavoritoByFavoritoId2:"SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1 AND favoritos.id_favorito=$2",

    findPeliculabyId:"SELECT id_pelicula as id,url_imagen as imagen,titulo anio,director,genero,duracion FROM peliculas WHERE id_pelicula=$1",

    findUserbyID: "SELECT * FROM usuarios WHERE id_usuario=$1",

    searchPelicula: "SELECT peliculas.url_imagen, peliculas.titulo,peliculas.anio,peliculas.director, peliculas.genero,peliculas.duracion FROM peliculas  WHERE peliculas.titulo=$1",

    detalleById:"SELECT peliculas.url_imagen, peliculas.titulo,peliculas.anio,peliculas.director, peliculas.genero,peliculas.duracion FROM peliculas WHERE peliculas.id_pelicula=$1",

    addFavorito: "INSERT INTO favoritos (id_usuario, id_pelicula) VALUES ($1, $2)",

    deleteFavorito:'DELETE FROM favoritos WHERE id_usuario=$1 AND id_favorito=$2',

    //fin queries favoritos

    // INICIO QUERIES DE CRUD ADMIN
    peliculaExiste: "SELECT * FROM peliculas WHERE titulo=$1 AND anio=$2",

    crearPelicula: "INSERT INTO peliculas(titulo, url_imagen anio, director, genero, duracion) VALUES($1, $2, $3, $4, $5, $6) RETURNING titulo, id_imagen, anio, director, genero, duracion",

    actualizarPeliculaById: "UPDATE peliculas SET titulo = $1, url_imagen = $2, anio = $3, director = $4, genero = $5, duracion = $6 WHERE id_pelicula = $7 RETURNING titulo, url_imagen, anio, director, genero, duracion",

    eliminarPeliculaTablaPeliculas: "DELETE FROM peliculas WHERE id_pelicula = $1",

    eliminarPeliculaTablaFavoritos: "DELETE FROM favoritos WHERE id_pelicula = $1",

    obtenerTodasPeliculas: "SELECT * FROM peliculas",

    obtenerPeliculabyIdAdmin: "SELECT * FROM peliculas WHERE id_pelicula = $1",
    // FIN QUERIES DE CRUD ADMIN

    // Queries usadas en usuarios.controller
    findUserByEmail: "SELECT * FROM usuarios WHERE email=$1",
    insertUser:
        "INSERT INTO usuarios(nombre, email, contrasena, rol) VALUES($1, $2, $3, $4) RETURNING id_usuario, nombre, rol",
    // Fin de queries usadas en usuarios.controller
};

// EXPORTAR QUERIES
module.exports = { queries };
