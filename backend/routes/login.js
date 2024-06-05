import { Router } from "express";
import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";

const router = Router();

router.post("/", async (req, res) => {
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
          res.status(200).send({
            message: "User authenticated",
            username: row.username,
            authenticated: true,
          });
        } else {
          // Passwords don't match
          return res.status(401).send({ message: "Invalid password" });
        }
      });
    } else {
      return res.status(401).send({ message: "User not found" });
    }
  });
});

export default router;
