const mysql = require("../config/mysql");

class PostService {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    let createdAtDate = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;

    let sql = `
    INSERT INTO posts(
      title,
      body,
      created_at
    )
    VALUES(
      '${this.title}',
      '${this.body}',
      '${createdAtDate}'
    )
    `;

    return mysql.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM posts;";

    return mysql.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ${id};`;

    return mysql.execute(sql);
  }
}

module.exports = PostService;
