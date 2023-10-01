const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const postRouter = require("./post");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);

module.exports = router;
