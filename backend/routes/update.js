const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

router.post("/description", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let data = req.body;

  //   let sql = `UPDATE photos SET position = ? WHERE photo_id = ?;`;
  let sql = `update photos set description = ? where photo_id = ?;`;

  db.run(sql, [data.description, data.photo_id], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send({
      message: `Photos ${data.photo_id} description set to ${data.description}`,
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  });
});

module.exports = router;
