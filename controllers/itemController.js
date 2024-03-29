const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display index
exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items and category counts (in parallel)
  const [numItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Inventory Application Home',
    item_count: numItems,
    category_count: numCategories,
  });
});
// Display all items
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find()
    .sort({ name: 1 })
    .populate('category')
    .exec();
  res.render('item_list', {
    title: 'Item List',
    item_list: allItems,
  });
});
// Display specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details of items and categories specific to an item
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (item === null) {
    // No results.
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_detail', {
    title: item.name,
    item,
    // categories,
  });
});
// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  const allCategories = await Category.find().exec();

  res.render('item_form', {
    title: 'Create Item',
    category: allCategories,
  });
});
// Handle item create form on POST.
exports.item_create_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('category', 'Category must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must not be empty').trim().isLength({ min: 1 }).escape(),
  body('stock', 'Stock must not be empty').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form.
      const allCategories = await Category.find().exec();

      res.render('item_form', {
        title: 'Create Item',
        category: allCategories,
        item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save item.
      await item.save();
      res.redirect(item.url);
    }
  }),
];
// Display item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of item
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    res.redirect('/shop/items');
  }

  res.render('item_delete', {
    title: 'Delete Item',
    item,
  });
});
// Handle item delete form on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect('/shop/items');
});
// Display item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  // Get item and category for form
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().exec(),
  ]);

  if (item === null) {
    // No results.
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_form', {
    title: 'Update Item',
    category: allCategories,
    item,
  });
});
// Handle item update form on POST.
exports.item_update_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('category', 'Category must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must not be empty').trim().isLength({ min: 1 }).escape(),
  body('stock', 'Stock must not be empty').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form.
      const allCategories = await Category.find().exec();

      res.render('item_form', {
        title: 'Create Item',
        category: allCategories,
        item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Update the record.
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      // Redirect to item detail page.
      res.redirect(updatedItem.url);
    }
  }),
];
