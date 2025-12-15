import express from "express";
import {
  getCart,
  getCheckout,
  getOrders,
  getShopIndex,
  getProductsList,
  postAddToCart,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/shop", getShopIndex);
router.get("/products", getProductsList);
router.get("/cart", getCart);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);

router.post("/add-to-cart", postAddToCart);

export default router;
