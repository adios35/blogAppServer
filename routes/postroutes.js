import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPost,
  getPostByUserid,
} from "../controller/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();
// router.post("/addpost", createPost);
router.post("/addpost/:id/post", verifyToken, createPost);
router.get("/posts", getAllPost);
router.get("/posts/:id", getPostByUserid);
router.delete("/posts/:id", verifyToken, deletePost);
router.post("/edit/:id", verifyToken, editPost);

export default router;
