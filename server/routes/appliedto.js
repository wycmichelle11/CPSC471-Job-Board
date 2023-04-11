import express from "express";
import { addAppliedTo, getAppliedTo } from "../controllers/appliedto.js";

const router = express.Router();

router.post("/:jobid", addAppliedTo);
router.get("/", getAppliedTo)

export default router;