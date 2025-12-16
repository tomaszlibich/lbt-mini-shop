import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getShopIndex = (req, res) => {
  res.render("shop/index", { theme: "light" });
};

export const getProductDetails = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    res.render("shop/product-details", { product, theme: "light" });
  });
};

export const getProductsList = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      hasProducts: !!products?.length > 0,
      products,
      theme: "light",
    });
  });
};

export const getCart = (req, res) => {
  Cart.readCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = cart.products.map((prod) => {
        const productData = products.find((p) => p.id === prod.id);
        return { ...prod, ...productData };
      });

      res.render("shop/cart", { cart, cartProducts, theme: "light" });
    });
  });
};

export const getOrders = (req, res) => {
  res.render("shop/orders", { theme: "light" });
};

export const postAddToCart = (req, res) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product, () => {
      res.redirect("/cart");
    });
  });
};

export const postRemoveFromCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.removeProduct(productId, product.price, () => {
      res.redirect("/cart");
    });
  });
};

export const postChangeQuantity = (req, res) => {
  const productId = req.body.productId;
  const action = req.body.action;

  Product.findById(productId, (product) => {
    Cart.changeQuantity(productId, product.price, action, () => {
      res.redirect("/cart");
    });
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", { theme: "light" });
};
