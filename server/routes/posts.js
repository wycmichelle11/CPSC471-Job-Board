import express from "express"
import {addPost, deletePost, getMyPosts, getPost, getPosts, updatePost} from "../controllers/posts.js"

const router = express.Router();

router.get("/", getPosts);
router.get("/:jobid", getPost);
router.get("/target/:account",getMyPosts);
router.post("/", addPost);
router.delete("/:jobid", deletePost);
router.put("/:jobid", updatePost);

export default router;