const bcrypt = require("bcrypt");
const UserRepository = require("../database/mysql/user.repository");
const jwt = require("../utils/jwt");
const config = require("../config");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  authJoin = async (email, password, confirm, nick) => {
    try {
      const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!email || !password || !confirm || !nick) {
        return {
          status: 400,
          cookie: null,
          message: "미입력된 항목이 있습니다. 모두 입력하여 주세요.",
        };
      } else if (!emailCheck.test(email)) {
        return {
          status: 400,
          cookie: null,
          message: "이메일형식이 아닙니다.",
        };
      } else if (password.length < 4 || password.includes(email)) {
        return {
          status: 400,
          cookie: null,
          message:
            "비밀번호는 최소 4자 이상, 이메일과 같은 값이 포함될 수 없습니다.",
        };
      } else if (password !== confirm) {
        return {
          status: 400,
          cookie: null,
          message: "비밀번호가 일치하지 않습니다.",
        };
      }

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(password, salt);

      const refreshToken = jwt.generateRefreshToken();
      const accessToken = `Bearer ${refreshToken}`;

      await this.userRepository.authJoin(
        email,
        hashedPassword,
        refreshToken,
        nick
      );

      return {
        status: 201,
        cookie: {
          name: "refreshToken",
          accessToken,
          expiresIn: "7d",
        },
        message: "회원 가입에 성공하였습니다.",
      };
    } catch (error) {
      throw error;
    }
  };

  authLogin = async (email, password, existRefreshToken) => {
    const foundUserData = await this.userRepository.loginUser(email);
    if (!foundUserData || !email || !password) {
      return {
        status: 400,
        accesscookie: null,
        refreshcookie: null,
        message: "로그인에 실패하였습니다.",
      };
    }
    const userId = foundUserData.id;
    const [authType, authToken] = (existRefreshToken ?? "").split(" ");
    const accessToken = jwt.generateAccessToken(userId);
    const refreshToken = jwt.generateRefreshToken();

    class Returns {
      constructor() {}

      status201() {
        return {
          status: 201,
          accesscookie: {
            name: "accessToken",
            token: `Bearer ${accessToken}`,
            expiresIn: "30m",
          },
          refreshcookie: {
            name: "refreshToken",
            token: `Bearer ${refreshToken}`,
            expiresIn: "7d",
          },
          message: "로그인에 성공하였습니다.",
        };
      }

      status400() {
        return {
          status: 400,
          accesscookie: null,
          refreshcookie: null,
          message: "로그인에 실패하였습니다.",
        };
      }

      status200() {
        return {
          status: 200,
          accesscookie: {
            name: "accessToken",
            token: `Bearer ${accessToken}`,
            expiresIn: "30m",
          },
          refreshcookie: {
            name: "refreshToken",
            token: `Bearer ${authToken}`,
            expiresIn: "7d",
          },
          message: "로그인에 성공하였습니다.",
        };
      }
    }

    const status = new Returns();
    try {
      const match = await bcrypt.compare(password, foundUserData.password);
      if (!match) return status.status400();

      if (existRefreshToken) {
        const verified = jwt.verifyToken(authToken, config.jwt.refreshKey);
        if (foundUserData.refreshToken == authToken && verified) {
          return status.status200();
        } else if (foundUserData.refreshToken !== authToken || !verified) {
          await this.userRepository.updateToken(email, refreshToken);
          return status.status201();
        } else if (authType !== "Bearer" || !authToken) {
          return status.status400();
        }
      } else if (!existRefreshToken) {
        await this.userRepository.updateToken(email, refreshToken);
        return status.status201();
      }
    } catch (err) {
      console.log(err);
      return status.status400();
    }
  };
}

module.exports = AuthService;
