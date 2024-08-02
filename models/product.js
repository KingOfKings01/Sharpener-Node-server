const db = require("../util/database.js");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    try {
      await db.execute(
        "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
        [this.title, this.price, this.description, this.imageUrl]
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProductByID(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  ) {
    try {
      await db.execute(
        "UPDATE products SET title =?, imageUrl =?, description =?, price =? WHERE id =?",
        [updatedTitle, updatedImageUrl, updatedDescription, updatedPrice, productId]
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProductById(id) {
    try {
      await db.execute("DELETE FROM products WHERE id =?", [id]);
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      return await db.execute("SELECT * FROM products WHERE products.id = ?", [
        id,
      ]);
    } catch (err) {
      console.log(err);
      return [[], []];
    }
  }

  static async fetchAll() {
    try {
      const result = await db.execute("SELECT * FROM products");
      return result;
    } catch (err) {
      console.log(err);
      return [[], []];
    }
  }
};
