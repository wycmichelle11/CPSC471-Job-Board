import express from "express";
import { register, login, logout, verify } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify/:account", verify);
export default router;