import express, { Request, Response } from "express";


import { createToken, isAuth } from "../../../context/security/auth";
import ContactoRepositoryPostgres from "../db/contactos.repository.postgres";
import ContactoRepository from "../../domain/contactos.repository";
import ContactosUsecases from "../../application/contactos.usecases";
import Usuario from "../../../usuarios/domain/usuario";

const contactoRepository: ContactoRepository = new ContactoRepositoryPostgres();

const contactosUsecases: ContactosUsecases = new ContactosUsecases(
    contactoRepository
);

const router = express.Router();

router.post("/añadir",isAuth, async (req: Request, res: Response) => {
    const  email  = req.body.email;
    const { telefono, direccion, ciudad, pais, codigo_postal } = req.body;
    const usuarioAPI: Usuario = {
        email
    };
    const contactoAPI = {
        telefono,
        direccion,
        ciudad,
        pais,
        codigo_postal,
    };

    const usuario: Usuario = await contactosUsecases.añadir(contactoAPI, usuarioAPI);
    res.json({ usuario });
});

router.put("/modificar",isAuth, async (req: Request, res: Response) => {
    const email = req.body.email;
    const { telefono, direccion, ciudad, pais, codigo_postal } = req.body;
    const usuarioAPI: Usuario = {
        email
    };
    const contactoAPI = {
        telefono,
        direccion,
        ciudad,
        pais,
        codigo_postal,
    };

    const contacto = await contactosUsecases.modificar(contactoAPI, usuarioAPI);
    res.json({ contacto });
});

export default router;