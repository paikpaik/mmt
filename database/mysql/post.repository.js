const mysql = require("../../config/mysql");

class PostRepository {
  save(title, content) {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();

    const createdAtDate = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

    const sql = `
    INSERT INTO posts(
      title,
      content,
      createdAt
    )
    VALUES(
      '${title}',
      '${content}',
      '${createdAtDate}'
    )
    `;

    return mysql.execute(sql);
  }

  findAll() {
    const sql = "SELECT * FROM posts;";

    return mysql.execute(sql);
  }

  findById(id) {
    const sql = `SELECT * FROM posts WHERE id = ${id};`;

    return mysql.execute(sql);
  }
}

module.exports = PostRepository;
