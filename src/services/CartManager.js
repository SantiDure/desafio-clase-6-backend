import { Cart } from "../models/Cart.js";
import fs from "fs/promises";
import crypto from "crypto";
import { productManager } from "./ProductManager.js";
class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart({ products }) {
    const carts = await this.getCarts();
    const id = crypto.randomUUID();
    const newCart = new Cart(id, products);
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
    return;
  }

  async getCarts() {
    const carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts) || [];
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cartToFind = carts.find((c) => c.id === id);
    if (!cartToFind) {
      throw new Error(`El carrito con id ${id} no se encuentra o no existe`);
    }
    return cartToFind;
  }

  async deleteCart(id) {
    const carts = await this.getProducts();
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      carts.splice(cartIndex, 1);
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf8");
      return carts;
    }
    throw new Error(`El cart con id ${id} no se encuentra o no existe`);
  }
}

export const cartManager = new CartManager("./db/carts.json");
