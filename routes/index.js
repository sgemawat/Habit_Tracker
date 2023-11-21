// Importing express and creating a router
const express = require('express');
const router = express.Router();

// Importing controller for startPage
const startPageController = require('../controllers/startPage');

// Route for the home page
router.get('/', startPageController.home);

// Using the 'habits' router for nested routes
router.use('/habits', require('./habits'));

// Exporting the router
module.exports = router;
