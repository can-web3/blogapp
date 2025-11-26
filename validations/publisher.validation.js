const Joi = require("joi");

exports.createPublisherValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.empty": "Yazar adı boş olamaz.",
        "string.min": "Yazar adı en az 2 karakter olmalıdır.",
        "string.max": "Yazar adı en fazla 50 karakter olabilir.",
        "any.required": "Yazar adı zorunludur."
      }),
    short_description: Joi.string()
      .trim()
      .min(5)
      .max(255)
      .required()
      .messages({
        "string.empty": "Kısa açıklama boş olamaz.",
        "string.min": "Kısa açıklama en az 5 karakter olmalıdır.",
        "string.max": "Kısa açıklama en fazla 255 karakter olabilir.",
        "any.required": "Kısa açıklama zorunludur."
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  const errors = {};

  if (error) {
    error.details.forEach(err => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
  }

  if (Object.keys(errors).length > 0) {
    req.flash("errors", errors);
    req.flash("old", req.body);
    return res.redirect("back");
  }

  next();
};

exports.editPublisherValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.empty": "Yazar adı boş olamaz.",
        "string.min": "Yazar adı en az 2 karakter olmalıdır.",
        "string.max": "Yazar adı en fazla 50 karakter olabilir.",
        "any.required": "Yazar adı zorunludur."
      }),
    short_description: Joi.string()
      .trim()
      .min(5)
      .max(255)
      .required()
      .messages({
        "string.empty": "Kısa açıklama boş olamaz.",
        "string.min": "Kısa açıklama en az 5 karakter olmalıdır.",
        "string.max": "Kısa açıklama en fazla 255 karakter olabilir.",
        "any.required": "Kısa açıklama zorunludur."
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  const errors = {};

  if (error) {
    error.details.forEach(err => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
  }

  if (Object.keys(errors).length > 0) {
    req.flash("errors", errors);
    req.flash("old", req.body);
    return res.redirect("back");
  }

  next();
};