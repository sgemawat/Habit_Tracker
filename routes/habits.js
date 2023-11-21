// Importing express and creating a router
const express = require('express');
const router = express.Router();

// Importing controllers for home and weekView
const homeController = require('../controllers/home');
const weekViewController = require('../controllers/weekView');

// Routes for home page
router.get('/dailyView', homeController.home);
router.post('/createHabit', homeController.create);
router.get('/toggleStatus', homeController.toggleStatus);
router.get('/deleteHabit/:id', homeController.delete);

// Routes for weekView page
router.get('/weeklyView', weekViewController.weekView);
router.get('/weeklyView/toggleStatus', weekViewController.toggleStatus);

// Exporting the router
module.exports = router;
