import express from "express";

const router = express.Router();

router.get("/shop", (req, res) => {
  res.render("shop", { theme: "light" });
});

export default router;
