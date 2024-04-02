import Oferta from "./Oferta";

export default interface OfertaRepository {

    //default
    ofertasActivas(): Promise<Oferta[]>;
    encontrar(id: number): Promise<Oferta | null>;
    
    
    //Con auth y es empresa
    /*
    añadir(oferta: Oferta): Promise<Oferta>;
    eliminar(id: number): Promise<Oferta>;
    ofertasUsuario(id: number): Promise<Oferta[]>;
    modificar(oferta: Oferta): Promise<Oferta>;
    desactivar(id: number): Promise<Oferta>;
    activar(id: number): Promise<Oferta>;
    */
}