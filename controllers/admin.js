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

export const getAdminAddEditProduct = (req, res) => {
  const productId = req.params.productId;

  if (productId) {
    Product.findById(productId, (product) => {
      res.render("admin/add-edit-product", { product, theme: "dark" });
    });
  } else {
    res.render("admin/add-edit-product", { product: null, theme: "dark" });
  }
};

export const postAdminAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  product.add();

  res.redirect("/admin");
};

export const postAdminEditProduct = (req, res) => {
  const productId = req.params.productId;
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  product.update(
    productId,
    { title, imageUrl, price: parseFloat(price, 10), description },
    (newProducts) => {
      res.render("admin/index", {
        hasProducts: !!newProducts?.length > 0,
        products: newProducts,
        theme: "dark",
      });
    }
  );
};

export const postAdminDeleteProduct = (req, res) => {
  const productId = req.params.productId;

  Product.delete(productId, (newProducts) => {
    res.redirect("/admin");
  });
};
