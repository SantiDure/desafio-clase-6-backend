import { productManager } from "../services/ProductManager.js";

export async function getProductController(req, res) {
  let limit = req.query.limit;
  const data = await productManager.getProducts();
  if (!limit) {
    return res.json(data);
  }
  let limitedProducts = data.slice(0, limit);
  return res.json(limitedProducts);
}

export async function getProductControllerId(req, res) {
  const id = req.params.id;
  try {
    const productForId = await productManager.getProductById(id);
    return res.json({ productForId });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export async function postProductController(req, res) {
  await productManager.addProduct(req.body);
  res.json(req.body);
}

export async function putProductController(req, res) {
  const { id } = req.params;
  await productManager.updateProduct(id, req.body);
  res.json(id);
}

export async function deleteProductController(req, res) {
  const { id } = req.params;
  await productManager.deleteProduct(id);
  res.json(req.body);
}
