const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  req.session.destroy();
  res.send({ message: "User logged out" });
});

module.exports = router;
