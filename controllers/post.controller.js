class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  getAllPosts = async (req, res, next) => {
    res.send("Get all posts Route");
  };

  createNewPost = async (req, res, next) => {
    res.send("create New Post Route");
  };

  getPostById = async (req, res, next) => {
    res.send("Get Post By Id Route");
  };
}

module.exports = PostController;
