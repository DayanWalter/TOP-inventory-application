const Category = require('../models/category');
const Item = require('../models/item');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategory = await Category.find().sort({ name: 1 }).exec();
  res.render('category_list', {
    title: 'Category List',
    category_list: allCategory,
  });
});

// Display detail page for a specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get detail of category and all associated items(in parallel)
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, 'name description').exec(),
  ]);

  // Throw error if category is not found
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_detail', {
    title: 'Category Detail',
    category,
    category_items: itemsInCategory,
  });
});
// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
});
// Handle Category create form on POST.
exports.category_create_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ mind: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('category_form', {
        title: 'Create Category',
        description,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save category.
      await category.save();
      res.redirect(category.url);
    }
  }),
];
// Display Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete GET');
});
// Handle Category delete form on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete POST');
});
// Display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update GET');
});
// Handle Category update form on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update POST');
});
