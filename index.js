require('dotenv').config();
const routes = require('./routes');
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const connectDB = require("./config/db");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const adminRoutes = require("./routes/admin.routes");

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(session({ secret: "canBlog", resave: false, saveUninitialized: true }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.alert_type = req.flash("alert_type");
  res.locals.alert_message = req.flash("alert_message");
  res.locals.errors = req.flash("errors");
  res.locals.old = req.flash("old")[0];
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layouts/app");
app.set("admin-layout", "layouts/admin");

app.locals.APP_NAME = process.env.APP_NAME;
app.locals.PORT = process.env.PORT || 3000;
app.locals.routes = routes;

app.use((req, res, next) => {
  console.log("Method:", req.method, "| URL:", req.originalUrl);
  next();
});

app.get(routes.home, (req, res) => {
  res.render("home", { title: "Ana Sayfa" });
});

app.use("/", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${process.env.PORT}`);
});
