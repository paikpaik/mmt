const mysql = require("../../config/mysql");
const { createdAt } = require("../../utils/timestamp");

class PostRepository {
  constructor(title, body, database) {
    this.title = title;
    this.body = body;
    this.createdAt = createdAt();
    this.database = database || mysql;
  }

  save(title, content) {
    const createdAt = this.createdAt;

    const sql = `
    INSERT INTO posts(
      title,
      content,
      createdAt
    )
    VALUES(
      '${title}',
      '${content}',
      '${createdAt}'
    )
    `;

    return this.database.execute(sql);
  }

  findAll() {
    const sql = "SELECT * FROM posts;";

    return this.database.execute(sql);
  }

  findById(id) {
    const sql = `SELECT * FROM posts WHERE id = ${id};`;

    return this.database.execute(sql);
  }
}

module.exports = PostRepository;
