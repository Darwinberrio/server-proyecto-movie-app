-- ELIMINAR TABLAS SI EXISTEN
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS peliculas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS imagenes;

-- TABLA IMAGENES
CREATE TABLE imagenes (
  id_imagen SERIAL PRIMARY KEY,
  nombre TEXT,
  descripcion TEXT,
  filename TEXT NOT NULL,
  originalname TEXT,
  mimetype TEXT,
  size INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA USUARIO
CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  rol VARCHAR(20) DEFAULT 'user'
);

-- TABLA PELICULAS
CREATE TABLE peliculas (
  id_pelicula SERIAL PRIMARY KEY,
  id_imagen INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  anio INT NOT NULL,
  director VARCHAR(50) NOT NULL,
  genero VARCHAR(100) NOT NULL,
  duracion NUMERIC(3),
  CONSTRAINT fk_imagen FOREIGN KEY (id_imagen) REFERENCES imagenes(id_imagen)
);

-- TABLA FAVORITOS
CREATE TABLE favoritos (
  id_favorito SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_pelicula INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_pelicula FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula)
);

-- INSERTS
INSERT INTO usuarios (nombre, email, contrasena, rol)
VALUES
('sebastian','sebasti.salazar@gmail.com','123456','admin'),
('julio','juliogtrenard@gmail.com','123456','admin'),
('darwin','darwinberrio@gmail.com','123456','admin'),
('alba','sandin.alba@gmail.com','123456','admin'),
('prueba','prueba@gmail.com','123456','user');

INSERT INTO imagenes (filename, originalname, mimetype, size, nombre, descripcion)
VALUES ('file1', 'file1.jpg', 'image/jpeg', 102435, '1687012394821-imagen.jpg', 'imagen 1');INSERT INTO peliculas (id_imagen, titulo, anio, director, genero, duracion)
VALUES (
  1,
  'Todo a la vez en todas partes',
  2022,
  'Daniel Kwan',
  'Comedia, Acción, Ciencia ficción',
  132
);

INSERT INTO favoritos (id_usuario, id_pelicula)
VALUES (1, 1);