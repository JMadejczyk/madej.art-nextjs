const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const sharp = require("sharp");

// const upload = multer({ dest: "./public/images" });

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

// router.use((req, res, next) => {
//   let db = new sqlite3.Database(
//     "./backend/database/portfolio.db",
//     sqlite3.OPEN_READONLY,
//     (err) => {
//       if (err) {
//         console.error(err.message);
//       }
//     }
//   );
//   const data = req.body;
//   const photoIds = data.photos.map((photo) => photo.photo_id);

//   const placeholders = photoIds.map(() => "?").join(",");
//   let sql = `SELECT photo_id FROM photos WHERE photo_id IN (${placeholders})`;

//   db.all(sql, photoIds, (err, rows) => {
//     if (err) {
//       throw err;
//     }

//     if (rows.length === 0) {
//       next();
//     } else {
//       let answer = rows.map((row) => row.photo_id);

//       res
//         .status(409)
//         .send({ message: `Photo ${answer} is already in database` });
//     }
//   });
// });

////////////////////////////////////////////////////////////////

// router.use((req, res, next) => {
//   let db = new sqlite3.Database(
//     "./backend/database/portfolio.db",
//     sqlite3.OPEN_READWRITE,
//     (err) => {
//       if (err) {
//         console.error(err.message);
//       }
//     }
//   );

//   const data = req.body;
//   // console.log(data);
//   // let tags = data["photos"].map((photo) => photo.tags).flat();
//   data["photos"].forEach((photo) => {
//     const { photo_id, tags } = photo;
//     tags.forEach((tag) => {
//       let sql = `select tag_id from tags where name = ?`;
//       db.get(sql, [tag], (err, row) => {
//         if (err) {
//           throw err;
//         }
//         if (row) {
//           let sql2 = `select * from tags_photos where photo_id = ? and tag_id = ?`;
//           db.get(sql2, [photo_id, row["tag_id"]], (err, row2) => {
//             if (err) {
//               throw err;
//             }
//             if (!row2) {
//               let sql3 = `INSERT INTO tags_photos (photo_id, tag_id) VALUES (?, ?)`;
//               db.run(sql3, [photo_id, row["tag_id"]], (err) => {
//                 if (err) {
//                   throw err;
//                 }
//               });
//             }
//           });
//         }
//       });
//     });
//   });
//   next();
// });

////////////////////////////////////////////////////////////////

router.post("/top", upload.array("images"), async (req, res) => {
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
    const base64Image = resizedImageBuffer.toString("base64");
    file.base64 = base64Image;
    file.position = index + 1;
  }

  // console.log(req.files);

  // res.status(200).send({ message: "Photos added" });
  //
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  let sql = `UPDATE photos set position = (position + ?) * -1;`;
  // const data = req.body;
  photos = req.files;

  let sql3 = `UPDATE photos set position = position * -1;`;
  db.run(sql, [photos.length], (err) => {
    if (err) {
      throw err;
    }
    db.run(sql3, (err) => {
      if (err) {
        throw err;
      }
      let sql2 = `INSERT INTO photos
      (file_name, width, height, description, blurred, localization, position)
      VALUES (?, ?, ?, ?, ?, ?, ?);`;
      photos.forEach((photo) => {
        const {
          // photo_id,
          filename: file_name,
          width,
          height,
          description,
          base64: blurred,
          position,
        } = photo;
        db.run(
          sql2,
          [
            // photo_id,
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
    res.status(200).send({ message: "Photos added" });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  });
});

////////////////////////////////////////////////////////////////

// router.post("/top", (req, res) => {
//   let db = new sqlite3.Database(
//     "./backend/database/portfolio.db",
//     sqlite3.OPEN_READWRITE,
//     (err) => {
//       if (err) {
//         console.error(err.message);
//       }
//     }
//   );

//   let sql = `UPDATE photos set position = (position + ?) * -1;`;

//   const data = req.body;
//   photos = data.photos;

//   let sql3 = `UPDATE photos set position = position * -1;`;
//   db.run(sql, [photos.length], (err) => {
//     if (err) {
//       throw err;
//     }
//     db.run(sql3, (err) => {
//       if (err) {
//         throw err;
//       }

//       let sql2 = `INSERT INTO photos
//       (photo_id, file_name, width, height, description, blurred, localization, position)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

//       photos.forEach((photo) => {
//         const {
//           photo_id,
//           file_name,
//           width,
//           height,
//           description,
//           blurred,
//           localization,
//           position,
//         } = photo;

//         db.run(
//           sql2,
//           [
//             photo_id,
//             file_name,
//             width,
//             height,
//             description,
//             blurred,
//             localization,
//             position,
//           ],
//           (err) => {
//             if (err) {
//               throw err;
//             }
//           }
//         );
//       });
//     });

//     res.status(200).send({ message: "Photos added" });

//     db.close((err) => {
//       if (err) {
//         console.error(err.message);
//       }
//     });
//   });
// });

////////////////////////////////////////////////////////////////

router.post("/bottom", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let sql = `select max(position) as max from photos;`;

  const data = req.body;
  photos = data.photos;

  let max_position = 1;
  db.get(sql, (err, row) => {
    if (err) {
      throw err;
    }
    if (row) {
      max_position = row["max"];
    }
    console.log("Max position: " + max_position + "row(max): " + row["max"]);

    let sql2 = `INSERT INTO photos
            (photo_id, file_name, width, height, description, blurred, localization, position)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    photos.forEach((photo) => {
      let {
        photo_id,
        file_name,
        width,
        height,
        description,
        blurred,
        localization,
        position,
      } = photo;
      position += max_position;
      console.log("Max position: " + max_position);

      console.log("Position: " + position);

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
});

////////////////////////////////////////////////////////////////
module.exports = router;
