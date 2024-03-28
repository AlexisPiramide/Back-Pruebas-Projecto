CREATE TABLE Etiqueta (
    nombre VARCHAR(255) PRIMARY KEY;
);

CREATE TABLE Etiquetas_Oferta (
    id_etiqueta VARCHAR(255),
    id_oferta SERIAL,
    FOREIGN KEY (id_etiqueta) REFERENCES etiqueta(nombre),
    FOREIGN KEY (id_oferta) REFERENCES oferta(id)
);

CREATE TABLE Oferta (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    fecha_publicacion,
    estado ENUM('Activa', 'Inactiva'),
    Usuario SERIAL,
    FOREIGN KEY (Usuario) REFERENCES Usuario(id)
);

-----------------------------------------------

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    contacto SERIAL,
    tipo ENUM('Administrador', 'Usuario','Empresa'),
    FOREIGN KEY (contacto) REFERENCES Contactos(id)
);

CREATE TABLE Contactos (
    id SERIAL PRIMARY KEY,
    telefono VARCHAR(255),
    direccion VARCHAR(255),
    ciudad VARCHAR(255),
    pais VARCHAR(255),
    codigo_postal VARCHAR(255)
);

-----------------------------------------------