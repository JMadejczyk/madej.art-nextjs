const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const photosRoute = require("./routes/photos");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());

const cors = require("cors");

app.use(cors());

app.use(
  session({
    secret: "Super secret secret",
    // cookie: {},
    resave: false,
    saveUninitialized: false,
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
  })
);
app.use("/api/photos", photosRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
