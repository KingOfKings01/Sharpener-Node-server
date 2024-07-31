// const products = []
const Product = require('../models/product')

exports.getProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}

exports.postProduct = (req, res, next) => {
    // products.push({ title: req.body.title, size: req.body.size });
    const product = new Product(req.body.title, req.body.size)
    product.save()
    res.redirect('/');
  }

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll()
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }