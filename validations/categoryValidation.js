const Joi = require("joi");

exports.createCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.base": "Kategori adı geçerli bir metin olmalıdır.",
        "string.empty": "Kategori adı boş olamaz.",
        "string.min": "Kategori adı en az 2 karakter olmalıdır.",
        "string.max": "Kategori adı en fazla 50 karakter olabilir.",
        "any.required": "Kategori adı zorunludur."
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};

    error.details.forEach(err => {
      const field = err.path[0]; 
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(err.message[0]);
    });

    req.flash("errors", errors);
    req.flash("old", req.body);

    return res.redirect("back");
  }

  next();
};
