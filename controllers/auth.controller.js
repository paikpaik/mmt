const AuthService = require("../services/auth.service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  authJoin = async (req, res, next) => {
    try {
      const { email, password, confirm, nick } = req.body;
      const { status, cookie, message } = await this.authService.authJoin(
        email,
        password,
        confirm,
        nick
      );

      if (cookie) {
        res.cookie(cookie.name, cookie.token, { expiresIn: cookie.expiresIn });
      }

      return res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  };

  authLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existRefreshToken = req.cookies.refreshToken;
      console.log(existRefreshToken);
      const { status, accesscookie, refreshcookie, message } =
        await this.authService.authLogin(email, password, existRefreshToken);
      if (accesscookie && refreshcookie) {
        res.cookie(accesscookie.name, accesscookie.token, {
          expiresIn: accesscookie.expiresIn,
        });
        res.cookie(refreshcookie.name, refreshcookie.token, {
          expiresIn: refreshcookie.expiresIn,
        });
      }
      return res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
