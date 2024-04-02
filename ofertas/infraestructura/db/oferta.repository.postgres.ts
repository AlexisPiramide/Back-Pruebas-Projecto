import executeQuery from "../../../context/postgres.connector";
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

    
}