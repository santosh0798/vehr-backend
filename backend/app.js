const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://54.145.254.42"] }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Import all routes
const auth = require("./routes/auth");
const attendance = require("./routes/employeeAttendance");
const employee = require("./routes/employee");
const company = require("./routes/company");


const path = require("path");

//Setting Up Config File
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use("/api/v1", auth);
app.use("/api/v1", attendance);
app.use("/api/v1", employee);
app.use("/api/v1", company);



var enableCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(enableCORS);

// __dirname = path.resolve();
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "frontend/build")));

//   // ...
//   // Right before your app.listen(), add this:
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }
module.exports = app;
