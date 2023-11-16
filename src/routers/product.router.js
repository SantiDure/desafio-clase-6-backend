import {
  getController,
  getControllerId,
  postController,
} from "../controllers/product.controller.js";
import { Router } from "express";
export const productRouter = Router();
productRouter.get("/", getController);
productRouter.get("/:id", getControllerId);
productRouter.post("/", postController);
