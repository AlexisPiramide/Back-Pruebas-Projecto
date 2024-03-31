import Usuario from '../../usuarios/domain/Usuario';
import Contacto from './contacto';

export default interface ContactoRepository {
    añadir(contacto: Contacto, usuario:Usuario): Promise<Usuario>;
    modificar(contacto: Contacto, usuario: Usuario): Promise<Contacto>;
}