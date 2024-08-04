const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const rows = await Product.findAll();
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const rows = await Product.findAll();
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = (req, res, next) => {
  const run = async () => {
    try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts();
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    } catch (err) {
      console.log(err);
    }
  };
  run();
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  try {
    // Retrieve the user's cart
    const cart = await req.user.getCart();
    fetchedCart = cart;

    // Check if the product is already in the cart
    const products = await cart.getProducts({ where: { id: prodId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      // If product exists in the cart, increase its quantity
      const oldQuantity = product.CartItem.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      // If product doesn't exist in the cart, find it in the database
      product = await Product.findByPk(prodId);
      if (!product) {
        // If the product doesn't exist in the database, return an error response
        return res.status(404).send('Product not found');
      }
    }

    // Add the product to the cart with the updated or new quantity
    await fetchedCart.addProduct(product, {
      through: { quantity: newQuantity }
    });

    // Redirect the user to the cart page
    res.redirect('/cart');
  } catch (err) {
    // Improved error handling
    console.error('Error adding product to cart:', err);
    res.status(500).send('An error occurred while adding the product to the cart.');
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try{
    const productId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id: productId}})
    const product = products[0];
    await product.CartItem.destroy()
    res.redirect('/cart');
  } catch (err) {
    console.log(err)
  }
}


exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};
