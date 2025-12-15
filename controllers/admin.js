import { Product } from "../models/product.js";

export const getAdmin = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/index", {
      hasProducts: !!products?.length > 0,
      products,
      theme: "dark",
    });
  });
};

export const getAdminAddProduct = (req, res) => {
  res.render("admin/add-product", { theme: "dark" });
};

export const postAdminAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  product.save();

  res.redirect("/admin");
};

export const getAdminEditProduct = (req, res) => {
  res.render("admin/edit-product", { theme: "dark" });
};

export const postAdminEditProduct = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/index", {
      hasProducts: !!products?.length > 0,
      products,
      theme: "dark",
    });
  });

  //find and amend

  const product = new Product(req.body.title);

  res.redirect("/admin");
};

export const postAdminDeleteProduct = (req, res) => {
  Product.fetchAll((products) => {
    //find and delete

    res.render("admin/index", {
      hasProducts: !!products?.length > 0,
      products,
      theme: "dark",
    });
  });
};
