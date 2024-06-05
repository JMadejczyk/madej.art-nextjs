import { Router } from "express";
import sqlite3 from "sqlite3";

const router = Router();

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
  let { first, second } = req.body;
  first = first.photo_id;
  second = second.photo_id;

  let sql = `SELECT photo_id FROM photos WHERE photo_id IN (?, ?)`;

  db.all(sql, [first, second], (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length === 2) {
      next();
    } else {
      let answer = rows.map((row) => row.photo_id);
      console.log(answer);
      if (!answer.includes(first) && !answer.includes(second)) {
        return res
          .status(409)
          .send({ message: `Photo ${first} and ${second} is not in database` });
      }
      if (!answer.includes(first)) {
        return res
          .status(409)
          .send({ message: `Photo ${first} is not in database` });
      }
      if (!answer.includes(second)) {
        return res
          .status(409)
          .send({ message: `Photo ${second} is not in database` });
      }
    }
  });
});

///////////////////////////////////////////////////////////////////////////////

router.post("/", (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  let { first, second } = req.body;
  first = first.photo_id;
  second = second.photo_id;
  console.log("First: " + first + " Second:" + second);

  let sql = `select photo_id, position from photos where photo_id in (?, ?)`;
  let sql2 = `update photos set position = position * -1 where photo_id in (?, ?)`;
  let sql3 = `update photos set position = ? where photo_id = ?`;

  db.all(sql, [first, second], (err, rows) => {
    if (err) {
      throw err;
    }
    let first_position = rows[0].position;
    let second_position = rows[1].position;

    db.run(sql2, [first, second], (err) => {
      if (err) {
        throw err;
      }
      db.run(sql3, [second_position, first], (err) => {
        if (err) {
          throw err;
        }
        db.run(sql3, [first_position, second], (err) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ message: "Photos swapped" });
        });
      });
    });
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

export default router;
