const queries = {

    //Queries favoritos
    favoritosByUserId:
        "SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.id_pelicula as id_pelicula, peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1",

    findfavoritoByFavoritoId:"SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1 AND favoritos.id_pelicula=$2",

    findfavoritoByFavoritoId2:"SELECT favoritos.id_favorito as id_favorito,favoritos.id_usuario as id_user,peliculas.titulo as titulo,peliculas.anio as anio,peliculas.director as director,peliculas.genero as genero,peliculas.duracion as duracion FROM peliculas INNER JOIN favoritos ON peliculas.id_pelicula = favoritos.id_pelicula INNER JOIN usuarios ON favoritos.id_usuario = usuarios.id_usuario WHERE favoritos.id_usuario=$1 AND favoritos.id_favorito=$2",

    findPeliculabyId:"SELECT id_pelicula as id,id_imagen as imagen,titulo anio,director,genero,duracion FROM peliculas WHERE id_pelicula=$1",

    findUserbyID: "SELECT * FROM usuarios WHERE id_usuario=$1",


    addFavorito: "INSERT INTO favoritos (id_usuario, id_pelicula) VALUES ($1, $2)",

    deleteFavorito:'DELETE FROM favoritos WHERE id_usuario=$1 AND id_favorito=$2',

    //fin queries favoritos



    // Queries usadas en usuarios.controller
    findUserByEmail: "SELECT * FROM usuarios WHERE email=$1",
    insertUser:
        "INSERT INTO usuarios(nombre, email, contrasena, rol) VALUES($1, $2, $3, $4) RETURNING id_usuario, nombre, rol",
    // Fin de queries usadas en usuarios.controller
};

module.exports = { queries };
