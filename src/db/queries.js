
const queries={
    
    favoritosByID:'SELECT peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1',

    findUserbyID:'SELECT * FROM usuarios WHERE id_usuario=$1'
}

module.exports={queries};