import Usuario from '../../usuarios/domain/usuario';

export default interface Oferta {
    id?: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion?: Date;
    estado?: 'Activa' | 'Inactiva';
    Usuario?: Usuario;
}