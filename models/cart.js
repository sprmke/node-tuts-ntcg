const fs = require('fs');
const path = require('path');

const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch  the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // add new product / increase quantity
      if (existingProduct) {
        updatedProduct = existingProduct;
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      // update product.json
      fs.writeFile(cartPath, JSON.stringify(cart), err => console.log(err));
    });


  }
}