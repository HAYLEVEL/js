const express = require('express');
const homeController = require('../controllers/home.js');
const router = express.Router();



router
    .get("/about", homeController.getAbout)
    .get("/", homeController.getIndex)

module.exports = router;