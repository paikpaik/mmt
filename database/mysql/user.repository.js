const mysql = require("../../config/mysql");
const { createdAt } = require("../../utils/timestamp");

class UserRepository {
  constructor() {
    this.createdAt = createdAt();
  }

  async authJoin(email, password, refreshToken, nick) {
    try {
      const createdAt = this.createdAt;
      const query = `INSERT INTO users (email, password, refreshToken, nick, createdAt) VALUES (?, ?, ?, ?, ?)`;
      const [rows] = await mysql.execute(query, [
        email,
        password,
        refreshToken,
        nick,
        createdAt,
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email) {
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await mysql.execute(query, [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateToken(email, refreshToken) {
    try {
      const query = `UPDATE users SET refreshToken = ? WHERE email = ?`;
      const [rows] = await mysql.execute(query, [refreshToken, email]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
