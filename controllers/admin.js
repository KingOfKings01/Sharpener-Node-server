const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  //// await Product.create({ title, imageUrl, description, price });
  await req.user.createProduct({ title, imageUrl, description, price });
  res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");

  const productId = req.params.id;

  try {
    //// const product = await Product.findByPk(productId);
    const product = await req.user.getProducts(productId)
    res.render("admin/edit-product", {
      product: product[0],
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postEditProduct = async (req, res) => {
  const {
    productId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    price: updatedPrice,
    description: updatedDescription,
  } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) res.redirect("/admin/products");
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;

    await product.save();

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res, next) => {
  //// const products = await Product.findAll();
  const products = await req.user.getProducts();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.postDeleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.productId);
  await product.destroy();
  res.redirect("/admin/products");
};
