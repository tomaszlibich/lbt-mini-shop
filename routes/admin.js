import express from "express";

const router = express.Router();
const products = [];

router.get("/admin", (req, res) => {
  res.render("admin/index", {
    hasProducts: !!products?.length > 0,
    products,
    theme: "dark",
  });
});

router.get("/admin/add-product", (req, res) => {
  res.render("admin/add-product", { theme: "dark" });
});

router.post("/admin/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/admin");
});

export default router;
