require("dotenv").config();
var bodyParser = require("body-parser");
let express = require("express");
let app = express();

absolutePath = __dirname + "/views/index.html";
path = __dirname + "/public";

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time,
  });
});

app.get("/:word/echo", function (req, res) {
  const { word } = req.params;
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.json({ name: `${firstname} ${lastname}` });
});

app.post("/name", (req, res) => {
  const firstname = req.body.first;
  const lastname = req.body.last;
  res.json({ name: `${firstname} ${lastname}` });
});

module.exports = app;
