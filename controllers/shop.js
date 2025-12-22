import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getShopIndex = (req, res) => {
  res.render("shop/index", { isAuthenticated: req.isLoggedIn, theme: "light" });
};

export const getProductDetails = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  res.render("shop/product-details", {
    isAuthenticated: req.session.isLoggedIn,
    product,
    theme: "light",
  });
};

export const getProductsList = async (req, res) => {
  const products = await Product.fetchAll();

  res.render("shop/product-list", {
    hasProducts: !!products?.length > 0,
    isAuthenticated: req.session.isLoggedIn,
    products,
    theme: "light",
  });
};

export const getCart = (req, res) => {
  Cart.readCart(async (cart) => {
    const products = await Product.fetchAll();

    const cartProducts = cart.products.map((prod) => {
      const productData = products.find((p) => p.id === prod.id);

      return { ...prod, ...productData };
    });

    res.render("shop/cart", {
      cart,
      cartProducts,
      isAuthenticated: req.session.isLoggedIn,
      theme: "light",
    });
  });
};

export const getOrders = (req, res) => {
  res.render("shop/orders", {
    isAuthenticated: req.session.isLoggedIn,
    theme: "light",
  });
};

export const postAddToCart = async (req, res) => {
  const productId = parseInt(req.body.productId, 10);

  console.log("productId", productId, typeof productId);

  const product = await Product.findById(productId);

  Cart.addProduct(productId, product, () => {
    res.redirect("/cart");
  });
};

export const postRemoveFromCart = async (req, res) => {
  const productId = parseInt(req.body.productId, 10);
  const product = await Product.findById(productId);

  Cart.removeProduct(productId, product.price, () => {
    res.redirect("/cart");
  });
};

export const postChangeQuantity = async (req, res) => {
  const productId = parseInt(req.body.productId, 10);
  const action = req.body.action;

  const product = await Product.findById(productId);

  Cart.changeQuantity(productId, product.price, action, () => {
    res.redirect("/cart");
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    isAuthenticated: req.session.isLoggedIn,
    theme: "light",
  });
};
