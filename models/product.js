const fs = require("fs");

module.exports = class Product {
  constructor(title, size) {
    this.title = title;
    this.size = size;
  }

  save() {
    const data = { title: this.title, size: this.size };
    fs.appendFile("message.txt", JSON.stringify(data)+",", (err) => {
      if (err) {
        console.log(err)
      }
    });
  }
  static async fetchAll() {
    try {
      const data = await fs.promises.readFile("message.txt", "utf8");
      const products = "[" + data.slice(0, -1) + "]"
      return JSON.parse(products);
    } catch (err) {
      return null; // or handle the error
    }
  }
  
};
