import express from "express";
import { getLogin, postLogin, getLogout } from "../controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);
router.get("/logout", getLogout);
router.post("/login", postLogin);

export default router;
