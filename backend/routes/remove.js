const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

router.post("/drop", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `delete from photos`;

  db.run(sql, (err) => {
    if (err) {
      throw err;
    }
    let sql2 = `delete from tags_photos`;
    db.run(sql2, (err) => {
      if (err) {
        throw err;
      }
    });

    res.status(200).send({ message: "Photos deleted" });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

module.exports = router;

////////////////////////////////////////////////////////////////
