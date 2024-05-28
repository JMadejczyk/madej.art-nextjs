const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const getRoute = require("./routes/get");
const addRoute = require("./routes/add");
const removeRoute = require("./routes/remove");
const changeRoute = require("./routes/change");

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
    secret:
      "Hottentottenstottertrottelmutterbeutelrattenlattengitterkofferattentäter",
    // cookie: {},
    resave: false,
    saveUninitialized: false,
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
  })
);

app.use("/api/photos/get", getRoute);
app.use("/api/auth", authRoute);
app.use("/api/photos/add", addRoute);
app.use("/api/photos/remove", removeRoute);
app.use("/api/photos/change", changeRoute);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
