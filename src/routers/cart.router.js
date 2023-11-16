import { getCarts } from "../controllers/carts.controller.js";
import { Router } from "express";
export const cartRouter = Router();
cartRouter.get("/carts", getCarts);
