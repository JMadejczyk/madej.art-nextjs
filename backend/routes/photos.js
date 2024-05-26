const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

router.use((req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    // res.status(401).send({ message: "Unauthorized" });
    res.status(401).send(req.session);
  }
});

router.get("/", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `SELECT * FROM photos`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).send(rows);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

module.exports = router;
