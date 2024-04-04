import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../../usuarios/domain/Usuario";
import Oferta from "../../domain/Oferta";
import OfertaRepository from "../../domain/Ofertas.repository";

export default class OfertaRepositoryPostgres implements OfertaRepository {

    async ofertasActivas(): Promise<Oferta[]> {

        const query = `SELECT * FROM Oferta JOIN Usuario ON Oferta.usuario_id = Usuario.id WHERE Oferta.estado = 'Activa'`;
        const rows: any[] = await executeQuery(query);

        const ofertas: Oferta[] = [];

        rows.forEach(oferta => {
            const ofertaDB: Oferta = {
                titulo: oferta.titulo,
                descripcion: oferta.descripcion,
                fecha_publicacion: oferta.fecha_publicacion,
                estado: oferta.estado,
                Usuario: oferta.Usuario
            };
            ofertas.push(ofertaDB);
        });


        return ofertas;
    }

    async encontrar(id: number): Promise<Oferta | null> {

        const query = `SELECT * FROM Oferta WHERE id = ${id}`;
        const rows: any[] = await executeQuery(query);

        const ofertaDB: Oferta = {
            titulo: rows[0].titulo,
            descripcion: rows[0].descripcion,
            fecha_publicacion: rows[0].fecha_publicacion,
            estado: rows[0].estado
        };

        return ofertaDB;
    }


    async añadir(oferta: Oferta): Promise<Oferta> {
        const { titulo, descripcion, fecha_publicacion, estado } = oferta;
        const query = `INSERT INTO Oferta (titulo, descripcion, fecha_publicacion, estado) VALUES ('${titulo}', '${descripcion}', '${fecha_publicacion}', '${estado}') RETURNING *`;
        const rows: any[] = await executeQuery(query);
        const ofertaDB: Oferta = {
            titulo: rows[0].titulo,
            descripcion: rows[0].descripcion,
            fecha_publicacion: rows[0].fecha_publicacion,
            estado: rows[0].estado
        };

        return ofertaDB;
    }

    async eliminar(id: number): Promise<boolean> {
        const query = `DELETE FROM Oferta WHERE id = ${id} RETURNING *`;
        const rows: any[] = await executeQuery(query)
        if (rows.length === 0){
            return false;
        }
        else{
            return true;
        }

    }

    async ofertasUsuario(usuario: Usuario): Promise<Oferta[] | null> {
        const {id} = usuario;
        const query = `SELECT * FROM Oferta WHERE alias = ${id}`;

        const rows: any[] = await executeQuery(query);

        const ofertas: Oferta[] = [];

        rows.forEach(oferta => {
            const ofertaDB: Oferta = {
                titulo: oferta.titulo,
                descripcion: oferta.descripcion,
                fecha_publicacion: oferta.fecha_publicacion,
                estado: oferta.estado
            };
            ofertas.push(ofertaDB);
        });

        if (ofertas.length === 0){
            return null;
        }
        else{
            return ofertas;
        }
    }


}