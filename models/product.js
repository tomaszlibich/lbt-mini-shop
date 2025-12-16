import fs from "fs";
import path from "path";
import { rootPath } from "../utils/path.js";

const p = path.join(rootPath, "data", "products.json");

const getAllProducts = (callback) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      callback([]);

      return;
    }

    callback(JSON.parse(fileContent));
  });
};

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = parseFloat(price, 10);
    this.description = description;
  }

  add() {
    this.id = Math.random().toString();

    getAllProducts((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (error) => {
        if (error) {
          console.error("Error: ", error);
        }
      });
    });
  }

  update(productId, updatedProductData, callback) {
    getAllProducts((products) => {
      const productIndex = products.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...updatedProductData,
        };
      }

      fs.writeFile(p, JSON.stringify(products), (error) => {
        if (error) {
          console.error("Error: ", error);
        }
      });

      callback(products);
    });
  }

  static delete(productId, callback) {
    getAllProducts((products) => {
      const newProducts = products.filter((p) => p.id !== productId);

      fs.writeFile(p, JSON.stringify(newProducts), (error) => {
        if (error) {
          console.error("Error: ", error);
        }
        callback(newProducts);
      });
    });
  }

  static fetchAll(callback) {
    getAllProducts(callback);
  }

  static findById(id, callback) {
    getAllProducts((products) => {
      const product = products.find((p) => p.id === id);

      callback(product);
    });
  }
}
