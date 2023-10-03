const PostService = require("../services/post.service");

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getAllPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json({ count: posts.length, posts });
    } catch (error) {
      next(error);
    }
  };

  createNewPost = async (req, res, next) => {
    const { title, content } = req.body;
    try {
      const result = await this.postService.createNewPost(title, content);
      res.status(201).json({ message: "Post created successfully", result });
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await this.postService.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;
