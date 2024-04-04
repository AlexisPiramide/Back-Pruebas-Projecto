import Usuario from "../../usuarios/domain/Usuario";
import Oferta from "./Oferta";

export default interface OfertaRepository {

    //default
    ofertasActivas(): Promise<Oferta[]>;
    encontrar(id: number): Promise<Oferta | null>;
    
    
    //Con auth y es empresa
    añadir(oferta: Oferta): Promise<Oferta>;
    eliminar(id: number): Promise<boolean>;
    ofertasUsuario(usuario: Usuario): Promise<Oferta[] | null>;
    /*
    
    modificar(oferta: Oferta): Promise<Oferta>;
    desactivar(id: number): Promise<Oferta>;
    activar(id: number): Promise<Oferta>;
    */
}