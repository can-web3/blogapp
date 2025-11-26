const express = require("express");
const router = express.Router();
const routes = require("../routes"); 
const adminCategoryController = require("../controllers/category.controller");
const adminWriterController = require("../controllers/writer.controller");
const { createCategoryValidation } = require("../validations/category.validation");
const { createWriterValidation, editWriterValidation } = require("../validations/writer.validation");
const uploadImage = require("../middlewares/uploadImage");
const adminPublisherController = require("../controllers/publisher.controller");
const { createPublisherValidation } = require("../validations/publisher.validation");
const adminProductController = require("../controllers/product.controller");
const { createProductValidation, editProductValidation } = require("../validations/product.validation");

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

// publishers start
router.get(routes.adminPublishers, adminPublisherController.get_publishers);

router.get(routes.adminPublishersCreate, adminPublisherController.get_create_publisher);
router.post(routes.adminPublishers, createPublisherValidation, adminPublisherController.post_create_publisher);

router.get(routes.adminPublishersEdit, adminPublisherController.get_edit_publisher);
router.post(routes.adminPublishersShow, adminPublisherController.post_edit_publisher);

router.post(routes.adminPublishersDelete, adminPublisherController.post_delete_publisher);
// publishers end

// products start
router.get(routes.adminProducts, adminProductController.get_products);

router.get(routes.adminProductsCreate, adminProductController.get_create_product);
router.post(
  routes.adminProducts,
  uploadImage.single("image"),
  createProductValidation, 
  adminProductController.post_create_product
);

router.get(routes.adminProductsEdit, adminProductController.get_edit_product);
router.post(
  routes.adminProductsShow,
  uploadImage.single('image'),
  editProductValidation,
  adminProductController.post_edit_product
);

router.post(routes.adminProductsDelete, adminProductController.post_delete_product);
// products end

module.exports = router;
