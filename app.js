const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const pool = require("./config/mysql");

dotenv.config();
// 라우터
const apiRouter = require("./routes");
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// 라우터
app.use("/api", apiRouter);
app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL 연결 성공");

    // 이런식으로 쿼리를 실행하거나 다른 작업을 수행할 수 있음.
    // const results = await connection.query('SELECT * FROM mytable');

    connection.release(); // 연결 해제
    res.status(200).send("MySQL 연결 성공");
  } catch (error) {
    console.error("MySQL 연결 실패:", error);
    res.status(500).send("MySQL 연결 실패");
  }
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 는 잘못된 접근입니다 O.O`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
