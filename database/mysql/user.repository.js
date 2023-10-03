const mysql = require("../../config/mysql");
class UserRepository {
  async authJoin(email, password, refreshToken, nick) {
    try {
      const query = `INSERT INTO users (email, password, refreshToken, nick) VALUES (?, ?, ?, ?)`;
      const [rows] = await mysql.execute(query, [
        email,
        password,
        refreshToken,
        nick,
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
