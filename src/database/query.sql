CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT 
);

CREATE TABLE tipo_persona (
    TipoPersona varchar(100) NOT NULL PRIMARY KEY
);

SELECT * FROM personas;
SELECT * FROM tipo_persona;