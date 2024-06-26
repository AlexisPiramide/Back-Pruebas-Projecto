import Usuario from "./usuario";

export default interface UsuarioRepository {
  registro(usuario: Usuario): Promise<Usuario>;
  login(usuario: Usuario): Promise<Usuario>;
  modificar(usuario: Usuario): Promise<Usuario>;
}