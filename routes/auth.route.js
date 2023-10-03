const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();
const authController = new AuthController();

// 회원가입
router.post("/join", authController.authJoin);

// 로그인
router.post("/login", authController.authLogin);

// 카카오 로그인

// 구글 로그인

module.exports = router;
