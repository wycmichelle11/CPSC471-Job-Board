import express from "express";
import {addAppliedTo, addFlag, delFlag, getAppliedTo, getFlagged} from "../controllers/appliedto.js";

const router = express.Router();

router.post("/:jobid", addAppliedTo);
router.get("/", getAppliedTo);
router.post("/flag/:jobid", addFlag);
router.delete("/flag/:jobid", delFlag);
router.get("/flag/", getFlagged);

export default router;