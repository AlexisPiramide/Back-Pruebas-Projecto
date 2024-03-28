import express from "express";
import dotenv from "dotenv";
import cors from "cors";


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
const api = "api/";


app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});