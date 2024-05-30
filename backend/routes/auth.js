const { Router } = require("express");

const router = Router();

router.post("/", (req, res) => {
  if (req.session.authenticated) {
    res.status(200).send({ message: "User authenticated" });
  } else {
    res.status(200).send({ message: "Unauthorized" });
  }
});

module.exports = router;
