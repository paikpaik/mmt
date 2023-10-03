const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }
}

module.exports = UserController;
