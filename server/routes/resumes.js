import express from "express"
import { addResume, getResume } from "../controllers/resumes.js"

const router = express.Router();

router.get("/", getResume);
router.post("/", addResume);

export default router;