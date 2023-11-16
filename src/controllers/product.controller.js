import { productManager } from "../services/ProductManager.js";

export async function getController(req, res) {
  let limit = req.query.limit;
  const data = await productManager.getProducts();
  if (!limit) {
    return res.json(data);
  }
  let limitedProducts = data.slice(0, limit);
  return res.json(limitedProducts);
}

export async function getControllerId(req, res) {
  const id = req.params.id;
  try {
    const productForId = await productManager.getProductById(id);
    return res.json({ productForId });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export async function postController(req, res) {
  const newProduct = req.body;
  await productManager.addProduct(newProduct);
  res.json(newProduct);
}
