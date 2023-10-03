const JWT = require("jsonwebtoken");
const config = require("../config/index");

const secretKey = config.jwt.accessKey;
const refreshKey = config.jwt.refreshKey;

function generateAccessToken(userId) {
  return JWT.sign({ userId }, secretKey, {
    expiresIn: "30m",
  });
}

function generateRefreshToken() {
  return JWT.sign({}, refreshKey, {
    expiresIn: "7d",
  });
}

function verifyToken(token, key) {
  try {
    return JWT.verify(token, key);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
