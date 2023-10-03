const express = require("express");
const router = express.Router();

//const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const postRouter = require("./post.route");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

//router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);

module.exports = router;
