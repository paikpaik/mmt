const express = require("express");
const PostController = require("../controllers/post.controller");

const router = express.Router();
const postController = new PostController();

router.get("/", postController.getAllPosts);
router.post("/", postController.createNewPost);
router.get("/:id", postController.getPostById);

module.exports = router;
