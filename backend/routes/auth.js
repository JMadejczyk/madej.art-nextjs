const { Router } = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

const router = Router();

router.post("/login", async (req, res) => {
  let db = new sqlite3.Database(
    "./backend/database/portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  const { username, password } = req.body;
  // console.log(username, password, req.body);

  const sql = `SELECT username, password FROM users WHERE username = ?`;

  db.get(sql, username, (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      bcrypt.compare(password, row.password, function (err, result) {
        if (result) {
          // Passwords match
          req.session.authenticated = true;
          return res.status(200).send({ message: "User authenticated" });
        } else {
          // Passwords don't match
          bcrypt.hash(password, 10, function (err, hash) {
            // console.log(hash, row.password);
          });
          return res.status(401).send({ message: "Invalid password" });
        }
      });
    } else {
      return res.status(401).send({ message: "User not found" });
    }
  });
});

module.exports = router;
