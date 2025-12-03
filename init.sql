-- ELIMINAR TABLAS SI EXISTEN
DROP TABLE IF EXISTS favoritos;

DROP TABLE IF EXISTS peliculas;

DROP TABLE IF EXISTS usuarios;

-- TABLA USUARIO
CREATE TABLE
  usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    rol VARCHAR(20) DEFAULT 'user'
  );

-- TABLA PELICULAS
CREATE TABLE
  peliculas (
    id_pelicula SERIAL PRIMARY KEY,
    url_imagen VARCHAR(255) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    director VARCHAR(50) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracion NUMERIC(3)
  );

-- TABLA FAVORITOS
CREATE TABLE
  favoritos (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_pelicula INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    CONSTRAINT fk_pelicula FOREIGN KEY (id_pelicula) REFERENCES peliculas (id_pelicula)
  );

-- INSERTS
INSERT INTO
  usuarios (nombre, email, contrasena, rol)
VALUES
  (
    'sebastian',
    'sebasti.salazar@gmail.com',
    '123456',
    'admin'
  ),
  (
    'julio',
    'juliogtrenard@gmail.com',
    '123456',
    'admin'
  ),
  (
    'darwin',
    'darwinberrio@gmail.com',
    '123456',
    'admin'
  ),
  (
    'alba',
    'sandin.alba@gmail.com',
    '123456',
    'admin'
  ),
  ('prueba', 'prueba@gmail.com', '123456', 'user'),
  (
    'mariana',
    'mariana.lopez@gmail.com',
    '123456',
    'user'
  ),
  (
    'carlos',
    'carlos.ramirez@gmail.com',
    '123456',
    'user'
  ),
  (
    'lucia',
    'lucia.gonzalez@gmail.com',
    '123456',
    'user'
  ),
  (
    'fernando',
    'fernando.perez@gmail.com',
    '123456',
    'admin'
  ),
  (
    'sofia',
    'sofia.martinez@gmail.com',
    '123456',
    'user'
  );

INSERT INTO
  peliculas (
    url_imagen,
    titulo,
    anio,
    director,
    genero,
    duracion
  )
VALUES
  (
    '/uploads/pelicula1.png',
    'Todo a la vez en todas partes',
    2022,
    'Daniel Kwan',
    'Comedia, Acción, Ciencia ficción',
    132
  ),
  (
    '/uploads/pelicula2.png',
    'Inception',
    2010,
    'Christopher Nolan',
    'Ciencia ficción, Acción',
    148
  ),
  (
    '/uploads/pelicula3.png',
    'El Señor de los Anillos: La Comunidad del Anillo',
    2001,
    'Peter Jackson',
    'Fantasía, Aventura',
    178
  ),
  (
    '/uploads/pelicula4.png',
    'Interstellar',
    2014,
    'Christopher Nolan',
    'Aventura, Ciencia ficción, Drama',
    169
  ),
  (
    '/uploads/pelicula5.png',
    'El Padrino',
    1972,
    'Francis Ford Coppola',
    'Crimen, Drama',
    175
  ),
  (
    '/uploads/pelicula6.png',
    'Pulp Fiction',
    1994,
    'Quentin Tarantino',
    'Crimen, Drama',
    154
  ),
  (
    '/uploads/pelicula7.png',
    'La La Land',
    2016,
    'Damien Chazelle',
    'Musical, Romance, Drama',
    128
  ),
  (
    '/uploads/pelicula8.png',
    'Matrix',
    1999,
    'Lana Wachowski, Lilly Wachowski',
    'Acción, Ciencia ficción',
    136
  ),
  (
    '/uploads/pelicula9.png',
    'Gladiator',
    2000,
    'Ridley Scott',
    'Acción, Drama',
    155
  ),
  (
    '/uploads/pelicula10.png',
    'Avatar',
    2009,
    'James Cameron',
    'Ciencia ficción, Aventura',
    162
  );

INSERT INTO
  favoritos (id_usuario, id_pelicula)
VALUES
  (1, 1),
  (2, 3),
  (2, 1),
  (3, 5),
  (3, 2),
  (4, 4),
  (4, 6),
  (5, 1),
  (6, 7),
  (7, 8),
  (8, 9),
  (9, 10),
  (10, 3);