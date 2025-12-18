import { Product } from "../models/product.js";

export const getAdmin = async (req, res) => {
  const products = await Product.fetchAll();

  res.render("admin/index", {
    hasProducts: !!products?.length > 0,
    products,
    theme: "dark",
  });
};

export const getAdminAddEditProduct = async (req, res) => {
  const productId = req.params.productId;

  if (productId) {
    const product = await Product.findById(productId);

    res.render("admin/add-edit-product", { product, theme: "dark" });
  } else {
    res.render("admin/add-edit-product", { product: null, theme: "dark" });
  }
};

export const postAdminAddProduct = async (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  await product.add();

  res.redirect("/admin");
};

export const postAdminEditProduct = async (req, res) => {
  const productId = req.params.productId;
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(title, imageUrl, price, description);

  const newProducts = await product.update(productId, {
    title,
    imageUrl,
    price: parseFloat(price, 10),
    description,
  });

  res.render("admin/index", {
    hasProducts: !!newProducts?.length > 0,
    products: newProducts,
    theme: "dark",
  });
};

export const postAdminDeleteProduct = async (req, res) => {
  const productId = req.params.productId;

  await Product.delete(productId);

  res.redirect("/admin");
};
