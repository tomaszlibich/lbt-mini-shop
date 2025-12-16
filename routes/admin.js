import express from "express";
import {
  getAdmin,
  getAdminAddEditProduct,
  postAdminAddProduct,
  postAdminEditProduct,
  postAdminDeleteProduct,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/admin", getAdmin);

router.get("/admin/add-product", getAdminAddEditProduct);
router.post("/admin/add-product", postAdminAddProduct);

router.get("/admin/edit-product/:productId", getAdminAddEditProduct);
router.post("/admin/edit-product/:productId", postAdminEditProduct);

router.post("/admin/delete-product/:productId", postAdminDeleteProduct);

export default router;
