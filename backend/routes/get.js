const { Router } = require("express");
const { get } = require("http");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

// router.use((req, res, next) => {
//   if (req.session.authenticated) {
//     next();
//   } else {
//     res.status(401).send({ message: "Unauthorized" });
//     // res.status(401).send(req.session);
//   }
// });

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
  // console.log(data);

  let placeholders = data.map(() => "?").join(",");
  let sql = `SELECT distinct photos.photo_id, file_name, width, height, description, blurred, localization, position FROM photos join tags_photos on photos.photo_id = tags_photos.photo_id join tags on tags.tag_id = tags_photos.tag_id WHERE tags.name in (${placeholders}) order by photos.position asc;`;
  db.all(sql, data, (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).send({ photos: rows });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

router.get("/tags/all", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `SELECT * FROM tags;`;

  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).send({ tags: rows });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

router.get("/tags/:photo_id", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `SELECT tags.name FROM tags join tags_photos on tags.tag_id = tags_photos.tag_id WHERE tags_photos.photo_id = ?;`;

  db.all(sql, req.params.photo_id, (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).send({ tags: rows });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  });
});

module.exports = router;
