import OfertaRepository from "../../domain/Ofertas.repository";
import OfertaRepositoryPostgres from "../db/oferta.repository.postgres";
import OfertaUseCases from "../../application/ofertas.usecases";
import express from "express";
import Usuario from "../../../usuarios/domain/Usuario";

const ofertaRepository: OfertaRepository = new OfertaRepositoryPostgres();

const ofertaUseCases: OfertaUseCases = new OfertaUseCases(
    ofertaRepository
);


const router = express.Router();

router.get("/ofertas", async (req, res) => {
    const ofertas = await ofertaUseCases.ofertasActivas();
    res.json(ofertas);
});

router.get("/ofertas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const oferta = await ofertaUseCases.encontrar(id);
    res.json(oferta);
});

router.post("/ofertas", async (req, res) => {
    const { titulo, descripcion, fecha_publicacion, estado } = req.body;
    const ofertaAPI = {
        titulo,
        descripcion,
        fecha_publicacion,
        estado
    };
    const oferta = await ofertaUseCases.añadir(ofertaAPI);
    res.json(oferta);
});

router.delete("/ofertas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const eliminado = await ofertaUseCases.eliminar(id);
    res.json(eliminado);
});

router.get("/ofertas/usuario/:id", async (req, res) => {
    const { id } = req.body;
    const usuarioAPI: Usuario = {
        id
    };
    const ofertas = await ofertaUseCases.ofertasUsuario(usuarioAPI);
    res.json(ofertas);
});