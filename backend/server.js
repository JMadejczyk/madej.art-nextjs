const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const loginRoute = require("./routes/login");
const getRoute = require("./routes/get");
const addRoute = require("./routes/add");
const removeRoute = require("./routes/remove");
const swapRoute = require("./routes/swap");
const authRoute = require("./routes/auth");
const logoutRoute = require("./routes/logout");
const { requireAuth } = require("./lib/auth");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "Dupa",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
  })
);

app.use("/api/photos/get", getRoute);
app.use("/api/login", loginRoute);
app.use("/api/auth", authRoute);
app.use("/api/logout", logoutRoute);

app.use(requireAuth);
app.use("/api/photos/add", addRoute);
app.use("/api/photos/remove", removeRoute);
app.use("/api/photos/swap", swapRoute);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
