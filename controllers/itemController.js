const Item = require('../models/item');
const Category = require('../models/category');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display index
exports.index = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Index ');
});
// Display all items
exports.item_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item list');
});
// Display specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item detail');
});
// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item create GET');
});
// Handle item create form on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item create POST');
});
// Display item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete GET');
});
// Handle item delete form on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item delete POST');
});
// Display item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update GET');
});
// Handle item update form on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: item update POST');
});
