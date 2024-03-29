import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerContactos from "./contactos/infraestructure/rest/contactos.rest";
import routerUsuario from "./usuarios/infraestructure/rest/usuarios.rest";
dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

//routers
app.use("/api/usuarios", routerUsuario);
app.use("/api/contactos", routerContactos);


app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});