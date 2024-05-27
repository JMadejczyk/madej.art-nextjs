const { Router } = require("express");
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

// router.use((req, res, next) => {
//   if (req.session.authenticated) {
//     next();
//   } else {
//     // res.status(401).send({ message: "Unauthorized" });
//     res.status(401).send(req.session);
//   }
// });

////////////////////////////////////////////////////////////////

router.post("/add/one", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `UPDATE photos set position = position + 1;`;

  db.run(sql, (err) => {
    if (err) {
      throw err;
    }
  });

  let sql2 = `INSERT INTO photos 
  (photo_id, file_name, width, height, description, blurred, localization, position) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const {
    photo_id,
    file_name,
    width,
    height,
    description,
    blurred,
    localization,
    position,
  } = req.body;

  db.run(
    sql2,
    [
      photo_id,
      file_name,
      width,
      height,
      description,
      blurred,
      localization,
      position,
    ],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ message: "Photo added" });
    }
  );

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

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
    res.status(200).send({ message: "Photos deleted" });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

router.post("/check", (req, res) => {
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
  const photoIds = data.photos.map((photo) => photo.photo_id);
  console.log("PhotoIDS: " + photoIds);

  // Stwórz ciąg znaków zapytania dla każdego elementu w photoIds
  const placeholders = photoIds.map(() => "?").join(",");
  let sql = `SELECT * FROM photos WHERE photo_id IN (${placeholders})`;

  db.all(sql, photoIds, (err, rows) => {
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
  const photoIds = data.photos.map((photo) => photo.photo_id);

  const placeholders = photoIds.map(() => "?").join(",");
  let sql = `SELECT photo_id FROM photos WHERE photo_id IN (${placeholders})`;

  db.all(sql, photoIds, (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length === 0) {
      next();
    } else {
      let answer = rows.map((row) => row.photo_id);

      res
        .status(409)
        .send({ message: `Photo ${answer} is already in database` });
    }
  });
});

router.post("/add/many", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `UPDATE photos set position = position + ?;`;

  const data = req.body;
  photos = data.photos;

  db.run(sql, [photos.length], (err) => {
    if (err) {
      throw err;
    }
  });

  let sql2 = `INSERT INTO photos 
    (photo_id, file_name, width, height, description, blurred, localization, position) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  photos.forEach((photo) => {
    const {
      photo_id,
      file_name,
      width,
      height,
      description,
      blurred,
      localization,
      position,
    } = photo;

    db.run(
      sql2,
      [
        photo_id,
        file_name,
        width,
        height,
        description,
        blurred,
        localization,
        position,
      ],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  });
  res.status(200).send({ message: "Photos added" });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

module.exports = router;
