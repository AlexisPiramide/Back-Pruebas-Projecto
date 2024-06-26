import OfertaRepository from "../domain/ofertas.repository";
import Oferta from "../domain/oferta";
import Usuario from "../../usuarios/domain/usuario";

export default class OfertasUseCases {
    constructor(private ofertasRepository: OfertaRepository) { }

    async ofertasActivas(): Promise<Oferta[]>{
        return this.ofertasRepository.ofertasActivas();
    }
    encontrar(id: number): Promise<Oferta | null>{
        return this.ofertasRepository.encontrar(id);
    }
    
    
    añadir(oferta: Oferta): Promise<Oferta>{
        return this.ofertasRepository.añadir(oferta);
    }
    eliminar(id: number): Promise<boolean>{
        return this.ofertasRepository.eliminar(id);
    }
    ofertasUsuario(usuario: Usuario): Promise<Oferta[] | null>{
        return this.ofertasRepository.ofertasUsuario(usuario);
    }
}