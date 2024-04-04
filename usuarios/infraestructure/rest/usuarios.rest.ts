import express, { Request, Response } from "express";

//use cases
import UsuarioUseCases from "../../application/usuarios.usecases";
//repositories
import UsuarioRepository from "../../domain/usuarios.repository";
//implementations
import UsuarioRepositoryPostgres from "../db/usuarios.repository.postgres";
import Usuario from "../../domain/Usuario";
import { createToken } from "../../../context/security/auth";

const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuariosUseCases: UsuarioUseCases = new UsuarioUseCases(
    usuariosRepository
);

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const usuarioAPI: Usuario = {
        email,
        password,
    };
    const usuario: Usuario = await usuariosUseCases.registro(usuarioAPI);
    res.json({ email: usuario.email });
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const usuarioAPI: Usuario = {
        email,
        password,
    };
    const usuario: Usuario = await usuariosUseCases.login(usuarioAPI);
    if (usuario === null)
        res.status(404).json({ mensaje: "Usuario no encontrado" });
    const token = createToken(usuario);
    res.json({ token });
});

export default router;