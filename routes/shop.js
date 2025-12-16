import express from "express";
import {
  getCart,
  getCheckout,
  getOrders,
  getShopIndex,
  getProductDetails,
  getProductsList,
  postAddToCart,
  postRemoveFromCart,
  postChangeQuantity,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/shop", getShopIndex);
router.get("/products/:productId", getProductDetails);
router.get("/products", getProductsList);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);

router.get("/cart", getCart);
router.post("/add-to-cart", postAddToCart);
router.post("/remove-from-cart", postRemoveFromCart);
router.post("/change-quantity", postChangeQuantity);

export default router;
