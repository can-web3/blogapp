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
const adminRoutes = require("./routes/admin");

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

// app.use("/admin", (req, res, next) => {
//   res.locals.layout = "layouts/admin"; 
//   next();
// });

// app.get(routes.admin, (req, res) => {
//   res.render("admin/dashboard", { title: "Admin Paneli" });
// });

// app.get(routes.adminCategories, async (req, res) => {
//   const categories = await Category.find();
//   res.render("admin/categories/categories", { title: "Kategoriler", categories });
// });

// app.get(routes.adminCategoriesCreate, (req, res) => {
//   res.render("admin/categories/create-category", { title: "Kategori Ekle" });
// });

// app.post(routes.adminCategories, async (req, res) => {
//   try {
//     const { name } = req.body;

//     await Category.create({ name });

//     req.flash("alert_type", "success");
//     req.flash("alert_message", "Kategori eklendi!");
//     res.redirect(routes.adminCategories);
//   } catch (err) {
//     res.send("Hata: " + err.message);
//   }
// });

// app.get(routes.adminCategoriesEdit, async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.render("admin/categories/edit-category", { title: "Kategori Düzenle", category });
//   } catch (err) {
//     res.send("Hata: " + err.message);
//   }
// });

// app.post(routes.adminCategoriesShow, async (req, res) => {
//   try {
//     const { name } = req.body;
//     await Category.findByIdAndUpdate(req.params.id, { name });

//     req.flash("alert_type", "success");
//     req.flash("alert_message", "Kategori güncellendi!");
//     res.redirect(routes.adminCategories);
//   } catch (err) {
//     res.send("Hata: " + err.message);
//   }
// });

// app.post(routes.adminCategoriesDelete, async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     req.flash("alert_type", "success");
//     req.flash("alert_message", "Kategori silindi!");
//     res.redirect(routes.adminCategories);
//   } catch (err) {
//     res.send("Hata: " + err.message);
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${process.env.PORT}`);
});
