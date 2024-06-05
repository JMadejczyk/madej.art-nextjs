import { Router } from "express";
import sqlite3 from "sqlite3";
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

  let sql = `update photos set description = ? where photo_id = ?;`;

  db.run(sql, [data.description, data.photo_id], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send({
      message: `Photos ${data.photo_id} description set to ${data.description}`,
      description: data.description,
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  });
});

router.post("/tags", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  const data = req.body;
  let sql = `delete from tags_photos where photo_id = ?;`;
  db.run(sql, data.photo_id, (err) => {
    if (err) {
      throw err;
    }
    let placeholder = data.tags.map((tag) => "?").join(",");
    let sql2 = `select tag_id from tags where name in (${placeholder});`;
    db.all(sql2, data.tags, (err, rows) => {
      if (err) {
        throw err;
      }
      let sql3 = `insert into tags_photos (tag_id, photo_id) values (?, ?);`;
      rows.forEach((row) => {
        db.run(sql3, [row.tag_id, data.photo_id], (err) => {
          if (err) {
            throw err;
          }
        });
      });
      let sql4 = `select tags.name from tags_photos join tags on tags_photos.tag_id = tags.tag_id where photo_id = ?;`;
      db.all(sql4, data.photo_id, (err, rows) => {
        if (err) {
          throw err;
        }
        let tags = rows.map((row) => row.name);
        res.status(200).send({
          message: `Photos ${data.photo_id} tags set to ${tags.join(", ")}`,
          tags: tags,
        });
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
        });
      });
    });
  });
});

export default router;
