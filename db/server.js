const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3001;

const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: false,
  // store: new SequelizeStore({
  //   db: sequelize,
  // }),
};

app.use(session(sess));

////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  let db = new sqlite3.Database(
    "./portfolio.db",
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
    res.send(rows);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

////////////////////////////////////////////////////////////////////

app.post("/login", (req, res) => {
  let db = new sqlite3.Database(
    "./portfolio.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  const { username, password } = req.body;
  console.log(username, password, req.body);

  let sql = `SELECT username, password FROM users WHERE username = ?`;

  db.get(sql, username, (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      bcrypt.compare(password, row.password, function (err, result) {
        if (result) {
          // Passwords match
          res.send({ message: "User authenticated" });
        } else {
          // Passwords don't match
          bcrypt.hash(password, 10, function (err, hash) {
            console.log(hash, row.password);
          });
          res.send({ message: "Invalid password" });
        }
      });
    } else {
      res.send({ message: "User not found" });
    }
  });
});

////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
