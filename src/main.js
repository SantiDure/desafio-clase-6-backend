import express, { Router } from "express";
import { apiRouter } from "./routers/api.router.js";
const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.listen(8080, () => console.log("servidor levantado en el puerto 8080"));
