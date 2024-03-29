import { compare } from "bcrypt";
import { hash } from "../../context/security/encrypter";
import ContactoRepository from "../domain/contactos.repository";
import Usuario from "../../usuarios/domain/usuario";
import Contacto from "../domain/contacto";

export default class ContactosUseCases {
  constructor(private contactoRepository: ContactoRepository) {}

 
    async añadir(contacto: Contacto, usuario:Usuario): Promise<Usuario> {
        return this.contactoRepository.añadir(contacto,usuario);
    }
    
    async modificar(contacto: Contacto, usuario: Usuario): Promise<Contacto> {
        return this.contactoRepository.modificar(contacto, usuario);
    }

}