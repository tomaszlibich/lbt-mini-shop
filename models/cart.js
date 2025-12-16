import fs from "fs";
import path from "path";
import { rootPath } from "../utils/path.js";

const p = path.join(rootPath, "data", "cart.json");

export class Cart {
  static readCart(callback) {
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        return callback({ products: [], totalPrice: 0 });
      }
      const cart = JSON.parse(fileContent);

      callback(cart);
    });
  }

  static removeProduct(productId, price, callback) {
    fs.readFile(p, (error, fileContent) => {
      if (error) {
        return callback();
      }

      const cart = JSON.parse(fileContent);
      const productInCart = cart.products.find((prod) => prod.id === productId);

      if (!productInCart) {
        return callback();
      }

      const productPrice = productInCart.quantity * price;

      cart.products = cart.products.filter((prod) => prod.id !== productId);
      cart.totalPrice -= productPrice;

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        if (error) {
          console.error("Error: ", error);
        }
      });

      callback();
    });
  }

  static changeQuantity(productId, price, action, callback) {
    fs.readFile(p, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(fileContent);
      }

      const productInCartIndex = cart.products.findIndex(
        (p) => p.id === productId
      );

      if (productInCartIndex !== -1) {
        const existingProduct = cart.products[productInCartIndex];

        const updatedProduct = {
          ...existingProduct,
          quantity:
            action === "increase"
              ? existingProduct.quantity + 1
              : existingProduct.quantity - 1,
        };

        cart.products = [...cart.products];
        cart.products[productInCartIndex] = updatedProduct;
      }

      cart.products = cart.products.filter((prod) => prod.quantity > 0);

      cart.totalPrice =
        action === "increase"
          ? cart.totalPrice + price
          : cart.totalPrice - price;

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        if (error) {
          console.error("Error: ", error);
        }

        if (callback) {
          callback();
        }
      });
    });
  }

  static addProduct(productId, product, callback) {
    fs.readFile(p, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(fileContent);
      }

      const productInCartIndex = cart.products.findIndex(
        (p) => p.id === product.id
      );
      let updatedProduct;

      if (productInCartIndex !== -1) {
        const existingProduct = cart.products[productInCartIndex];

        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };

        cart.products = [...cart.products];
        cart.products[productInCartIndex] = updatedProduct;
      } else {
        updatedProduct = { id: productId, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += product.price;

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        if (error) {
          console.error("Error: ", error);
        }

        if (callback) {
          callback();
        }
      });
    });
  }
}
