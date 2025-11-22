const Writer = require("../models/Writer");
const routes = require("../routes");

exports.get_writers = async (req, res) => {
  try {
    const writers = await Writer.find();
    res.render("admin/writers/writers", {
      title: "Yazarlar",
      writers: writers
    });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_create_writer = (req, res) => {
  res.render("admin/writers/create-writer", { title: "Yazar Ekle" });
}

exports.post_create_writer = async (req, res) => {
  try {
    const { name, birthday, short_description } = req.body;

    const exists = await Writer.findOne({ name: name.trim() });
    if (exists) {
      req.flash("errors", { name: ["Yazar zaten mevcut."] });
      req.flash("old", req.body);
      return res.redirect("back");
    }

    const imagePath = `/uploads/${req.file.filename}`;

    await Writer.create({
      name,
      image: imagePath,
      birthday,
      short_description
    });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yazar başarıyla eklendi.");
    return res.redirect(routes.adminWriters);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.get_edit_writer = async (req, res) => {
  try {
    const writer = await Writer.findById(req.params.id);
    if (!writer) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yazar bulunamadı.");
      return res.redirect(routes.adminWriters);
    }
    res.render("admin/writers/edit-writer", { title: "Yazar Düzenle", writer });
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_edit_writer = async (req, res) => {
  try {
    const { name, birthday, short_description } = req.body;
    const writer = await Writer.findById(req.params.id);
    if (!writer) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yazar bulunamadı.");
      return res.redirect(routes.adminWriters);
    }
    writer.name = name;
    writer.birthday = birthday;
    writer.short_description = short_description;

    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      writer.image = imagePath;
    }
    await writer.save();

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yazar başarıyla güncellendi.");
    return res.redirect(routes.adminWriters);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};

exports.post_delete_writer = async (req, res) => {
  try {
    const writer = await Writer.findById(req.params.id);
    if (!writer) {
      req.flash("alert_type", "danger");
      req.flash("alert_message", "Yazar bulunamadı.");
      return res.redirect(routes.adminWriters);
    }
    await Writer.deleteOne({ _id: req.params.id });

    req.flash("alert_type", "success");
    req.flash("alert_message", "Yazar başarıyla silindi.");
    return res.redirect(routes.adminWriters);
  } catch (err) {
    res.send("Hata: " + err.message);
  }
};