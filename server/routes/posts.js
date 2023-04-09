import express from "express"
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/posts.js"

const router = express.Router();

router.get("/", getPosts);
router.get("/:jobid", getPost);
router.post("/", addPost);
router.delete("/", deletePost);
router.put("/:jobid", updatePost);

export default router;