import {
  getCartByIdController,
  postCartController,
  postAddProductToCartController,
  getCartsController,
} from "../controllers/carts.controller.js";
import { Router } from "express";
export const cartRouter = Router();
cartRouter.get("/", getCartsController);
cartRouter.get("/:cid", getCartByIdController);
cartRouter.post("/", postCartController);
cartRouter.post("/:cid/product/:pid", postAddProductToCartController);
/*
La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente FORMATO:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
*/
