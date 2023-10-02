const PostService = require("../services/post.service");

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getAllPosts = async (req, res, next) => {
    try {
      const [posts, _] = await PostService.findAll();
      res.status(200).json({ count: posts.length, posts });
    } catch (error) {
      next(error);
    }
  };

  createNewPost = async (req, res, next) => {
    res.send("create New Post Route");
  };

  getPostById = async (req, res, next) => {
    res.send("Get Post By Id Route");
  };
}

module.exports = PostController;
