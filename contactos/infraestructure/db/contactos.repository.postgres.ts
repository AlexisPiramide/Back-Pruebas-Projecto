import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../../usuarios/domain/usuario";
import Contacto from "../../domain/contacto";
import ContactoRepository from "../../domain/contactos.repository";

export default class ContactoRepositoryPostgres implements ContactoRepository {


    async añadir(contacto: Contacto, usuario:Usuario): Promise<Usuario> {
        const correo = usuario.email;
        const { telefono, direccion, ciudad, pais, codigo_postal } = contacto;
        
        const query = `INSERT INTO Contacto (telefono, direccion, ciudad, pais, codigo_postal) VALUES ('${telefono}', '${direccion}', '${ciudad}', '${pais}', '${codigo_postal}') RETURNING *`;
        
        const rows: any[] = await executeQuery(query);

        const vincularContactoUsuario = `UPDATE Usuario SET contacto = ${rows[0].id} WHERE email = '${correo}' RETURNING *`;
        const vinculacion: any[] = await executeQuery(vincularContactoUsuario);

        const contactoDB: Contacto = {
            id: rows[0].id,
            telefono: rows[0].telefono,
            direccion: rows[0].direccion,
            ciudad: rows[0].ciudad,
            pais: rows[0].pais,
            codigo_postal: rows[0].codigo_postal,
        };

        const usuarioDB: Usuario = {
            email: correo,
            contacto: contactoDB
        };
        return usuarioDB;
    }

    async modificar(contacto: Contacto, usuario: Usuario): Promise<Contacto> {

        const correo = usuario.email;

        const getID = `SELECT contacto FROM Usuario WHERE email = '${correo}'`;
        const id = await executeQuery(getID);
        const { telefono, direccion, ciudad, pais, codigo_postal } = contacto;
        /**Por encima de aqui no hay que cambiar nada */
        // Inicializamos una cadena para almacenar los campos a actualizar
        let camposUpdate = ''; 

        if (telefono) {
            camposUpdate += `telefono = '${telefono}', `;
        }
        if (direccion) {
            camposUpdate += `direccion = '${direccion}', `;
        }
        if (ciudad) {
            camposUpdate += `ciudad = '${ciudad}', `;
        }
        if (pais) {
            camposUpdate += `pais = '${pais}', `;
        }
        if (codigo_postal) {
            camposUpdate += `codigo_postal = '${codigo_postal}', `;
        }
        
        // Quitamos la última coma y espacio si hay campos para actualizar
        if (camposUpdate !== '') {
            camposUpdate = camposUpdate.slice(0, -2);
        }
        
        const query = `UPDATE Contacto SET ${camposUpdate} WHERE id = ${id} RETURNING *`;
        
        /*Por debajo de aqui no hay que cambiar nada*/

        const rows: any[] = await executeQuery(query);
        
        const contactoDB: Contacto = {
            id: rows[0].id,
            telefono: rows[0].telefono,
            direccion: rows[0].direccion,
            ciudad: rows[0].ciudad,
            pais: rows[0].pais,
            codigo_postal: rows[0].codigo_postal,
        };

        return contactoDB;
    }
}