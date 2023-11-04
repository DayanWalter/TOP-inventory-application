const express = require('express');
const router = express.Router();

// Require controller modules
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

/// ITEM ROUTES ///

// GET shop home page
router.get('/', item_controller.index);

// GET request for creating an Item. NOTE This must come before routes that display Item (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating an Item.
router.get('/item/create', item_controller.item_create_post);

// GET request for deleting an Item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request for deleting an Item
router.get('/item/:id/delete', item_controller.item_delete_post);

// GET request for updating an Item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request for updating an Item
router.get('/item/:id/update', item_controller.item_update_post);

// GET request for one Item
router.get('/item/:id', item_controller.item_detail);

// Get request for all Items
router.get('/items/', item_controller.item_list);

/// CATEGORY ///

// GET request for creating a category. NOTE This must come before routes that display category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating a category.
router.get('/category/create', category_controller.category_create_post);

// GET request for deleting a category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request for deleting a category
router.get('/category/:id/delete', category_controller.category_delete_post);

// GET request for updating a category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request for updating a category
router.get('/category/:id/update', category_controller.category_update_post);

// GET request for one category
router.get('/category/:id', category_controller.category_detail);

// Get request for all categories
router.get('/category/', category_controller.category_list);

module.exports = router;
