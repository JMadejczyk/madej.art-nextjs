const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const sharp = require("sharp");
const arePhotosInDb = require("../lib/addFunctions").arePhotosInDb;
const addTags = require("../lib/addFunctions").addTags;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

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
    if (row) {
      res.status(409).send({ message: "Tag " + tag + " already exists!" });
    } else {
      let sql2 = "INSERT INTO tags (name) VALUES (?)";
      db.run(sql2, [tag], (err) => {
        if (err) {
          throw err;
        }
      });
      res.status(200).send({ message: "Tag " + tag + " added succesfully!" });
    }
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

router.post("/top", upload.array("images"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  if (req.files.length > 1) {
    for (const [index, file] of req.files.entries()) {
      file.description = req.body.descriptions[index];
      file.tags = req.body.tags[index];
      const image = sharp(file.path);
      const metadata = await image.metadata();
      let x = metadata.width;
      let y = metadata.height;
      file.width = x;
      file.height = y;
      while (x > 20 || y > 20) {
        x = x / 2;
        y = y / 2;
      }
      x = Math.round(x);
      y = Math.round(y);
      const resizedImageBuffer = await image.resize(x, y).toBuffer();
      let base64Image = resizedImageBuffer.toString("base64");
      base64Image = "data:image/jpeg;base64," + base64Image;
      file.base64 = base64Image;
      file.position = index + 1;
    }
  } else {
    req.files[0].description = req.body.descriptions;
    req.files[0].tags = req.body.tags;
    const image = sharp(req.files[0].path);
    const metadata = await image.metadata();
    let x = metadata.width;
    let y = metadata.height;
    req.files[0].width = x;
    req.files[0].height = y;
    while (x > 20 || y > 20) {
      x = x / 2;
      y = y / 2;
    }
    x = Math.round(x);
    y = Math.round(y);
    const resizedImageBuffer = await image.resize(x, y).toBuffer();
    let base64Image = resizedImageBuffer.toString("base64");
    base64Image = "data:image/jpeg;base64," + base64Image;
    req.files[0].base64 = base64Image;
    req.files[0].position = 1;
  }

  photos = req.files;

  console.log(photos);

  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  try {
    const arePhotos = await arePhotosInDb(db, photos);
    console.log(arePhotos);
    if (arePhotos === false) {
      let sql2 = `UPDATE photos set position = (position + ?) * -1;`;
      db.run(sql2, [photos.length], (err) => {
        if (err) {
          throw err;
        }

        let sql3 = `UPDATE photos set position = position * -1;`;
        db.run(sql3, (err) => {
          if (err) {
            throw err;
          }

          let sql4 = `INSERT INTO photos
            (file_name, width, height, description, blurred, localization, position)
            VALUES (?, ?, ?, ?, ?, ?, ?);`;
          photos.forEach((photo) => {
            const {
              filename: file_name,
              width,
              height,
              description,
              base64: blurred,
              position,
            } = photo;
            db.run(
              sql4,
              [
                file_name,
                width,
                height,
                description,
                blurred,
                (localization = "images"),
                position,
              ],
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
        });
        addTags(db, photos);
        res.status(200).send({ message: "Photos added" });
      });
    } else {
      res
        .status(409)
        .send({ message: `Photo ${arePhotos} is already in database` });
    }
  } catch (err) {
    console.error(err);
  }

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

router.post("/bottom", upload.array("images"), async (req, res) => {
  if (req.files.length > 1) {
    for (const [index, file] of req.files.entries()) {
      file.description = req.body.descriptions[index];
      file.tags = req.body.tags[index];
      const image = sharp(file.path);
      const metadata = await image.metadata();
      let x = metadata.width;
      let y = metadata.height;
      file.width = x;
      file.height = y;
      while (x > 20 || y > 20) {
        x = x / 2;
        y = y / 2;
      }
      x = Math.round(x);
      y = Math.round(y);
      const resizedImageBuffer = await image.resize(x, y).toBuffer();
      let base64Image = resizedImageBuffer.toString("base64");
      base64Image = "data:image/jpeg;base64," + base64Image;
      file.base64 = base64Image;
      file.position = index + 1;
    }
  } else {
    req.files[0].description = req.body.descriptions;
    req.files[0].tags = req.body.tags;
    const image = sharp(req.files[0].path);
    const metadata = await image.metadata();
    let x = metadata.width;
    let y = metadata.height;
    req.files[0].width = x;
    req.files[0].height = y;
    while (x > 20 || y > 20) {
      x = x / 2;
      y = y / 2;
    }
    x = Math.round(x);
    y = Math.round(y);
    const resizedImageBuffer = await image.resize(x, y).toBuffer();
    let base64Image = resizedImageBuffer.toString("base64");
    base64Image = "data:image/jpeg;base64," + base64Image;
    req.files[0].base64 = base64Image;
    req.files[0].position = 1;
  }

  photos = req.files;

  console.log(photos);

  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let max_position = 1;
  let sql = `select max(position) as max from photos;`;

  db.get(sql, (err, row) => {
    if (err) {
      throw err;
    }
    if (row) {
      max_position = row["max"];
    }
  });

  try {
    const arePhotos = await arePhotosInDb(db, photos);
    console.log(arePhotos);
    if (arePhotos === false) {
      let sql4 = `INSERT INTO photos
            (file_name, width, height, description, blurred, localization, position)
            VALUES (?, ?, ?, ?, ?, ?, ?);`;

      photos.forEach((photo) => {
        let {
          filename: file_name,
          width,
          height,
          description,
          base64: blurred,
          position,
        } = photo;
        position += max_position;
        db.run(
          sql4,
          [
            file_name,
            width,
            height,
            description,
            blurred,
            (localization = "images"),
            position,
          ],
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      });
      addTags(db, photos);
      res.status(200).send({ message: "Photos added" });
    } else {
      res
        .status(409)
        .send({ message: `Photo ${arePhotos} is already in database` });
    }
  } catch (err) {
    console.error(err);
  }

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////

module.exports = router;
