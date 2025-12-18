import db from "../utils/database.js";

const getAllProducts = async () => {
  const result = await db.execute("SELECT * FROM products");

  return result[0];
};

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = parseFloat(price, 10);
    this.description = description;
  }

  async add() {
    await db.execute(
      "INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)",
      [this.title, this.imageUrl, this.price, this.description]
    );
  }

  async update(productId, updatedProductData) {
    await db.execute(
      "UPDATE products SET title = ?, imageUrl = ?, price = ?, description = ? WHERE id = ?",
      [
        updatedProductData.title,
        updatedProductData.imageUrl,
        parseFloat(updatedProductData.price, 10),
        updatedProductData.description,
        productId,
      ]
    );

    return await getAllProducts();
  }

  static async delete(productId) {
    await db.execute("DELETE FROM products WHERE id = ?", [productId]);
  }

  static async fetchAll() {
    return await getAllProducts();
  }

  static async findById(id) {
    const result = await db.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    return result[0][0];
  }
}
