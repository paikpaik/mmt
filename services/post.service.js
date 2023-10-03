const PostRepository = require("../database/mysql/post.repository");

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }
  createNewPost = async (title, content) => {
    try {
      const [result, _] = await this.postRepository.save(title, content);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getAllPosts = async () => {
    try {
      const [posts, _] = await this.postRepository.findAll();
      return posts;
    } catch (error) {
      throw error;
    }
  };

  getPostById = async (id) => {
    try {
      const [post, _] = await this.postRepository.findById(id);
      if (!post) {
        const error = new Error("Post not found");
        error.status = 404;
        throw error;
      }
      return post;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostService;
