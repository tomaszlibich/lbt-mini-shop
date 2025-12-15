import express from "express";
import {
  getAdmin,
  getAdminAddProduct,
  postAdminAddProduct,
  getAdminEditProduct,
  postAdminEditProduct,
  postAdminDeleteProduct,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/admin", getAdmin);

router.get("/admin/add-product", getAdminAddProduct);
router.post("/admin/add-product", postAdminAddProduct);

router.get("/admin/edit-product", getAdminEditProduct);
router.post("/admin/edit-product", postAdminEditProduct);

router.post("/admin/delete-product", postAdminDeleteProduct);

export default router;
