const fs = require('fs');
const path = require('path');

const productPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = callback => {
  fs.readFile(productPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(productPath, JSON.stringify(products), err => {
        console.log(err)
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}