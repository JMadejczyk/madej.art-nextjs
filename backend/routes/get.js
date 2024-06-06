import { Router } from "express";
import sqlite3 from "sqlite3";
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

router.get("/all", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `select * from photos order by position asc;`;
  db.all(sql, (err, rows) => {
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

router.get("/count", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `select count(*) as count from photos;`;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).send(rows[0]);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

router.get("/tags/allcount", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `SELECT tags.name, count(tags_photos.photo_id) as count FROM tags join tags_photos on tags.tag_id = tags_photos.tag_id group by tags.tag_id;`;

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

export default router;
