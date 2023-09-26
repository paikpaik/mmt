const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi api/user");
});

module.exports = router;
