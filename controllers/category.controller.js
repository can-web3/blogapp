const Category = require("../models/category.model");
const routes = require("../routes");

exports.get_categories = async (req, res) => {
  const categories = await Category.find();
  res.render("admin/categories/categories", {
    title: "Kategoriler",
    categories,
  });
};

exports.get_create_category = (req, res) => {
  res.render("admin/categories/create-category", { title: "Kategori Ekle" });
};

exports.post_create_category = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      req.flash("errors", { name: ["Kategori zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }
    
    await Category.create({ name });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Kategori eklendi!");
    res.redirect(routes.adminCategories);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_edit_category = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render("admin/categories/edit-category", {
      title: "Kategori Düzenle",
      category,
    });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_edit_category = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ 
      name: name.trim(),
      _id: { $ne: req.params.id }
    });

    if (exists) {
      req.flash("errors", { name: ["Kategori zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }

    await Category.findByIdAndUpdate(req.params.id, { name });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Kategori güncellendi!");
    res.redirect(routes.adminCategories);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_delete_category = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("alert_type", "success");
    req.flash("alert_message", "Kategori silindi!");
    res.redirect(routes.adminCategories);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};