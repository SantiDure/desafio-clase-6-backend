import { cartManager } from "../services/CartManager.js";
import { productManager } from "../services/ProductManager.js";
import fs from "fs/promises";
export async function getCartsController(req, res) {
  let limit = req.query.limit;
  const data = await cartManager.getCarts();
  if (!limit) {
    return res.json(data);
  }
  let limitedCarts = data.slice(0, limit);
  return res.json(limitedCarts);
}

export async function getCartByIdController(req, res) {
  const id = req.params.id;
  try {
    const cartForId = await cartManager.getCartById(id);
    return res.json({ cartForId });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export async function postAddProductToCartController(req, res) {
  const { cid, pid } = req.params;
  const cart = await cartManager.getCartById(cid);
  const product = await productManager.getProductById(pid);
  cart.products.push({ id: product.id, quantity: 1 });
  await fs.writeFile(cartManager.path, JSON.stringify([cart], null, 2), "utf8");
  return res.send(cid);
}

export async function postCartController(req, res) {
  await cartManager.addCart(req.body);
  res.json(req.body);
}

export async function putCartController(req, res) {
  const { id } = req.params;
  await cartManager.updateCart(id, req.body);
  res.json(id);
}

export async function deleteCartController() {
  const { id } = req.params;
  await cartManager.deleteCart(id);
  res.json(req.body);
}
