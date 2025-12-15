import { Product } from "../models/product.js";

export const getShopIndex = (req, res) => {
  res.render("shop/index", { theme: "light" });
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
  res.render("shop/cart", { theme: "light" });
};

export const getOrders = (req, res) => {
  res.render("shop/orders", { theme: "light" });
};

export const postAddToCart = (req, res) => {
  Product.fetchAll((products) => {
    //add to card and mark on the page

    res.render("shop/product-list", {
      hasProducts: !!products?.length > 0,
      products,
      theme: "light",
    });
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", { theme: "light" });
};
