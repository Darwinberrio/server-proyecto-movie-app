# SERVER PROYECTO MOVIE APP

## DESCRIPCIÓN GENERAL
Aplicación web desarrollada de búsqueda y gestión de películas que engloba diferentes funcionalidades y endpoints asociados.

## TECNOLOGÍAS UTILIZADAS
Para este proyecto se han utilizado las siguientes tecnologías:

1. **SERVER - BACKEND**
    - Node.js
    - Express.js
    - JWT
    - bcrypt
    - **OAuth - PENDIENTE**

2. **BBDD**
    - PostgreSQL
    - pg

3. **HERRAMIENTAS DE DESARROLLO**
    - Git & GitHub
    - Postman
    - Nodemon

4. **DESPLIEGUE**
    - Render

5. **VALIDACIÓN Y SEGURIDAD**
    - express-validator
    - CORS

6. **ORGANIZACIÓN DEL TRABAJO**
    - Trello

## ARQUITECTURA
```bash
.env.template
init.sql
package-lock.json
package.json
README.md
/src 
    /config - Configuración
    /controllers - Funciones controladoras
    /db - Queries
    /helpers - Funciones ayudadoras
    /middlewares - Funciones de middleware
    /routes - Rutas
    /validators - Funciones validadoras (check)
    /app.js
```

## ROLES DE USUARIO
Se diferencian dos roles de usuario:
    - **Admin:** Rol que gestiona las funciones relacionadas con las películas (BBDD). Estos usuarios son creados por los **desarrolladores.**
    - **User:** Rol que se adjudica **automáticamente** cuando un usuario nuevo se registra. 

## ENDPOINTS

## FLUJO DE AUTENTICACIÓN

## BBDD
La base de datos relacional se gestiona a través de **PostgreSQL** con las siguientes tablas:

**Modelo relacional**
![imagen modelo relacional BBDD](./imagenes-readme/modelo-relacional-bbdd.png)

**Modelo lógico**
![imagen modelo lógico BBDD](./imagenes-readme/modelo-logico-bbdd.png)

## INSTRUCCIONES DE INSTALACIÓN
1. Fork el repositorio
2. Instalar dependencias
```bash
npm install express, dotenv, cors, pg, express-validator, jsonwebtoken, ejs, bcrypt
```
**PENDIENTE MIRAR MÁS**
3. Ejecutar servidor en la terminal
```bash
npm run dev
```
4. En PostgreSQL crear el servidor con la BBDD y ejecutar las queries del archivo init.sql

## VARIABLES DE ENTORNO
1. Renombrar archivo .env.template por .env
2. Completar las variables de entorno con la información del entorno local o de producción

## COLECCIÓN DE POSTMAN
Para facilitar la prueba y verificación de los edpoints se incluye una colección de **Postman:**

**Autenticación**
**PENDIENTE HACER**
**Películas**
**PENDIENTE HACER**
**Favoritos**
**PENDIENTE HACER**

## USUARIOS DE PRUEBA
Para facilitar las pruebas de la aplicación se incluyen:
1. 1 usuario Admin
    - **Nombre de usuario:** fernando
    - **Contraseña:** 123456 
2. 2 usuarios User
    - **Nombre de usuario:** sofia
    - **Contraseña:** 123456
    - **Nombre de usuario:** lucia
    - **Contraseña:** 123456



