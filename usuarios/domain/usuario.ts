import Contacto from "../../contactos/domain/contacto";

export default interface Usuario {
    alias?: string;
    password?: string;
    email?: string;
    nombre?: string;
    tipo?: string;
    contacto?: Contacto;
}
