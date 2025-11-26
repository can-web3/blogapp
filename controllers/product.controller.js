const Product = require("../models/product.model");
const routes = require("../routes");

exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin/products/products", {
      title: "Ürünler",
      products: products
    });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_create_product = (req, res) => {
  res.render("admin/products/create-product", { title: "Ürün Ekle" });
}

exports.post_create_product = async (req, res) => {
  try {
    const { name, price, short_description, description } = req.body;

    const exists = await Product.findOne({ name: name.trim() });
    if (exists) {
      req.flash("errors", { name: ["Ürün zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }

    const imagePath = `/uploads/${req.file.filename}`;

    await Product.create({
      image: imagePath,
      name,
      price,
      short_description,
      description,
    });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Ürün başarıyla eklendi.");
    return res.redirect(routes.adminProducts);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_edit_product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Ürün bulunamadı.");
      return res.redirect(routes.adminProducts);
    }
    res.render("admin/products/edit-product", { title: "Ürün Düzenle", product });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_edit_product = async (req, res) => {
  try {
    const { name, price, short_description, description } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Ürün bulunamadı.");
      return res.redirect(routes.adminProducts);
    }

    const exists = await Product.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
    if (exists) {
      req.flash("errors", { name: ["Ürün zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }

    product.name = name;
    product.price = price;
    product.short_description = short_description;
    product.description = description;

    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      product.image = imagePath;
    }
    await product.save();

    req.flash("alert_type", "success");
    req.flash("alert_message", "Ürün başarıyla güncellendi.");
    return res.redirect(routes.adminProducts);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_delete_product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Ürün bulunamadı.");
      return res.redirect(routes.adminProducts);
    }
    await product.deleteOne({ _id: req.params.id });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Ürün başarıyla silindi.");
    return res.redirect(routes.adminProducts);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};