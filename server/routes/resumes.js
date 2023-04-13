import express from "express"
import {addResume, deleteResume, getResume} from "../controllers/resumes.js"

const router = express.Router();

router.get("/", getResume);
router.post("/", addResume);
router.delete("/",deleteResume);

export default router;