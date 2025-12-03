
const queries={
    
    favoritosByID:'SELECT peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1',

    findUserbyID:'SELECT * FROM usuarios WHERE id_usuario=$1',

    peliculaExiste: "SELECT * FROM peliculas WHERE titulo=$1 AND anio=$2",

    crearPelicula: "INSERT INTO peliculas(titulo, id_imagen, anio, director, genero, duracion) VALUES($1, $2, $3, $4, $5, $6) RETURNING titulo, id_imagen, anio, director, genero, duracion",

    actualizarPeliculaById: "UPDATE peliculas SET titulo = $1, id_imagen = $2, anio = $3, director = $4, genero = $5, duracion = $6 WHERE id_pelicula = $7 RETURNING titulo, id_imagen, anio, director, genero, duracion",

    eliminarPeliculaTablaPeliculas: "DELETE FROM peliculas WHERE id_pelicula = $1",

    eliminarPeliculaTablaFavoritos: "DELETE FROM favoritos WHERE id_pelicula = $1"
}

module.exports={queries};