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

router.post("/tag", (req, res) => {
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
  const tag = data.name;
  let sql = "select * from tags where name = ?";
  db.get(sql, [tag], (err, row) => {
    if (err) {
      throw err;
    }
    if (!row) {
      res.status(409).send({ message: "Tag " + tag + " does not exist!" });
    } else {
      let sql2 = "delete from tags where name = ?";
      let sql3 =
        "delete from tags_photos where tag_id = (select tag_id from tags where name = ?)";

      db.run(sql2, [tag], (err) => {
        if (err) {
          throw err;
        }
        db.run(sql3, [tag], (err) => {
          if (err) {
            throw err;
          }
        });
      });

      res.status(200).send({ message: "Tag " + tag + " removed succesfully!" });

      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
      });
    }
  });
});

////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  const data = req.body;
  console.log(req.body);
  const photoIds = data.photos.map((photo) => photo.photo_id);

  const placeholders = photoIds.map(() => "?").join(",");
  let sql = `SELECT photo_id FROM photos WHERE photo_id IN (${placeholders})`;

  db.all(sql, photoIds, (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length === photoIds.length) {
      next();
    } else {
      let present = rows.map((row) => row.photo_id);
      let answer = photoIds.filter((photo) => !present.includes(photo));

      res.status(409).send({ message: `Photo ${answer} is not in database` });
    }
  });
});

////////////////////////////////////////////////////////////////

router.post("/", (req, res) => {
  const data = req.body;
  const photos = data.photos;
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      photos.forEach((photo) => {
        const { photo_id } = photo;
        let sql = `delete from photos where photo_id = ?`;
        let sql2 = `delete from tags_photos where photo_id = ?`;

        db.run(sql, photo_id, (err) => {
          if (err) {
            throw err;
          }
        });

        db.run(sql2, photo_id, (err) => {
          if (err) {
            throw err;
          }
        });
      });
      res.status(200).send({ message: "Photos removed" });
    }
  );
});
