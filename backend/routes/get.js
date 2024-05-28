const { Router } = require("express");
const { get } = require("http");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

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

  let data = req.query.tags.split(",");
  console.log(data);

  // let keyword = req.query.keyword;

  let placeholders = data.map(() => "?").join(",");
  let sql = `SELECT * FROM photos join tags_photos on photos.photo_id = tags_photos.photo_id join tags on tags.tag_id = tags_photos.tag_id WHERE tags.name in (${placeholders})`;

  db.all(sql, data, (err, rows) => {
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

// router.use((req, res, next) => {
//   if (req.session.authenticated) {
//     next();
//   } else {
//     // res.status(401).send({ message: "Unauthorized" });
//     res.status(401).send(req.session);
//   }
// });

module.exports = router;
