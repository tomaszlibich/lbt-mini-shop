import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    isAuthenticated: req.session.isLoggedIn,
    theme: "light",
  });
});

export default router;
