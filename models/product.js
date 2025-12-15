import fs from "fs";
import path from "path";
import { rootPath } from "../utils/path.js";

const p = path.join(rootPath, "data", "products.json");

const getProductsFromFile = (callback) => {
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
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.error("Error: ", error);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}
