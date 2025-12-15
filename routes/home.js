import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { theme: "light" });
});

export default router;
