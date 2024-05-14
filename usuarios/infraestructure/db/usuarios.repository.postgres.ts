import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/usuario";
import UsuarioRepository from "../../domain/usuarios.repository";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {

    async registro(usuario: Usuario): Promise<Usuario> {
        const { email, password } = usuario;
        const query = `INSERT INTO Usuario (email, password) VALUES ('${email}', '${password}') RETURNING *`;
        const rows: any[] = await executeQuery(query);
        const usuarioDB: Usuario = {
            alias: rows[0].alias,
            password: rows[0].password,
        };
        return usuarioDB;
    }

    async login(usuario: Usuario): Promise<Usuario> {
        const { email } = usuario;
        const query = `SELECT * FROM Usuario WHERE email = '${email}'`;
        const rows: any[] = await executeQuery(query);
        if (rows.length === 0) {
            throw new Error("Usuario/contraseña no es correcto");
        } else {
            const usuarioDB: Usuario = {
                alias: rows[0].alias,
                password: rows[0].password,
            };
            return usuarioDB;
        }
    }

    modificar(usuario: Usuario): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }
}