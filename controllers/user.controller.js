class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
