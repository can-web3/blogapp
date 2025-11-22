const express = require("express");
const router = express.Router();
const routes = require("../routes"); 
const adminCategoryController = require("../controllers/AdminCategoryController");
const adminWriterController = require("../controllers/adminWriterController");
const { createCategoryValidation } = require("../validations/categoryValidation");
const { createWriterValidation, editWriterValidation } = require("../validations/writerValidation");
const uploadImage = require("../middlewares/uploadImage");
const Writer = require("../models/Writer");

router.use((req, res, next) => {
  res.locals.layout = "layouts/admin";
  next();
});

router.get(routes.admin, (req, res) => {
  res.render("admin/dashboard", { title: "Admin Paneli" });
});

// categories start
router.get(routes.adminCategories, adminCategoryController.get_categories);

router.get(routes.adminCategoriesCreate, adminCategoryController.get_create_category);
router.post(routes.adminCategories, createCategoryValidation, adminCategoryController.post_create_category);

router.get(routes.adminCategoriesEdit, adminCategoryController.get_edit_category);
router.post(routes.adminCategoriesShow, adminCategoryController.post_edit_category);

router.post(routes.adminCategoriesDelete, adminCategoryController.post_delete_category);
// categories end

// writers start
router.get(routes.adminWriters, adminWriterController.get_writers);

router.get(routes.adminWritersCreate, adminWriterController.get_create_writer);

router.post(
  routes.adminWriters, 
  uploadImage.single("image"), 
  createWriterValidation,
  adminWriterController.post_create_writer  
);

router.get(routes.adminWritersEdit, adminWriterController.get_edit_writer);

router.post(
  routes.adminWritersShow, 
  uploadImage.single("image"),
  editWriterValidation,
  adminWriterController.post_edit_writer
);
router.post(routes.adminWritersDelete, adminWriterController.post_delete_writer);
// writers end


module.exports = router;
