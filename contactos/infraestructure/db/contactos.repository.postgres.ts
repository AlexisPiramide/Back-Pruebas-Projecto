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
    
    modificar(contacto: Contacto): Promise<Contacto> {
        throw new Error("Method not implemented.");
    }
}