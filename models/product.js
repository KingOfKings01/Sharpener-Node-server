const fs = require("fs");
const path = require("path");

const productPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(productPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductsIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductsIndex] = this;
        fs.writeFile(productPath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = (Math.random() + Date.now()).toString();
        products.push(this);
        fs.writeFile(productPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteProductById(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((p) => p.id!== id); // skip the product that mach the id
      fs.writeFile(productPath, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }


  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
