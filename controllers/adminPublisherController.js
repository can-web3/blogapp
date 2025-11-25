const Publisher = require("../models/Publisher");
const routes = require("../routes");

exports.get_publishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.render("admin/publishers/publishers", {
      title: "Yayıncılar",
      publishers: publishers
    });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_create_publisher = (req, res) => {
  res.render("admin/publishers/create-publisher", { title: "Yayıncı Ekle" });
}

exports.post_create_publisher = async (req, res) => {
  try {
    const { name, short_description } = req.body;

    const exists = await Publisher.findOne({ name: name.trim() });
    if (exists) {
      req.flash("errors", { name: ["Yayıncı zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }


    await Publisher.create({
      name,
      short_description
    });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yayıncı başarıyla eklendi.");
    return res.redirect(routes.adminPublishers);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_edit_publisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yayıncı bulunamadı.");
      return res.redirect(routes.adminPublishers);
    }
    res.render("admin/publishers/edit-publisher", { title: "Yayıncı Düzenle", publisher });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_edit_publisher = async (req, res) => {
  try {
    const { name, short_description } = req.body;
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yayıncı bulunamadı.");
      return res.redirect(routes.adminPublishers);
    }

    const exists = await Publisher.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
    if (exists) {
      req.flash("errors", { name: ["Yayıncı zaten mevcut."], exists: exists });
      req.flash("old", req.body);
      return res.redirect("back");
    }

    publisher.name = name;
    publisher.short_description = short_description;

    await publisher.save();

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yayıncı başarıyla güncellendi.");
    return res.redirect(routes.adminPublishers);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_delete_publisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yayıncı bulunamadı.");
      return res.redirect(routes.adminPublishers);
    }
    await Publisher.deleteOne({ _id: req.params.id });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yayıncı başarıyla silindi.");
    return res.redirect(routes.adminPublishers);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};