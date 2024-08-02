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
  const product = new Product(title, imageUrl, description, price);
  await product.save();
  res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");

  const productId = req.params.id;
  // Product.findById(productId, (product) => {
  //   if (!product) return res.redirect("/");

  //   res.render("admin/edit-product", {
  //     product: product,
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //   });
  // });
  try {
    const [product] = await Product.findById(productId)
    res.render("admin/edit-product", {
          product: product[0],
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
        });
  } catch (err) {
    console.log(err)
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
    await Product.updateProductByID(
      productId,
      updatedTitle,
      updatedImageUrl,
      updatedDescription,
      updatedPrice
    );
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res, next) => {
  const [products] = await Product.fetchAll()
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  
};

exports.postDeleteProduct = async (req, res) => {
  await Product.deleteProductById(req.params.productId);
  res.redirect("/admin/products");
};
