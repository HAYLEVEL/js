const express = require('express');
const websiteController = require('../controllers/websites.js');
const Websites = require('../models/website.js');
const router = express.Router();

/**
 * Description of getting all websites
 * @route GET /api/websites
 * @group Websites - website operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<Website>} Website - a page with websites
 */

/**
 * Description of getting website by id
 * @route GET /api/websites/{id}
 * @group Websites - website operations
 * @param {integer} id.path.required - id of the Website
 * @returns {Website.model} 200 - Website object
 * @returns {Error} 404 - Website not found
 */

/**
 * Description of getting all websites
 * @route POST /api/websites
 * @group Websites - website operations
 * @param {Website.model} id.body.required - new Website object
 * @returns {Website.model} 201 - added Website object
 */

/**
 * Description of getting all websites
 * @route PUT /api/websites
 * @group Websites - website operations
 * @param {Website.model} id.body.required - new Website object
 * @returns {Website.model} 200 - changed Website object
 */


/**
 * Description of getting website by id
 * @route DELETE /api/websites/{id}
 * @group Websites - website operations
 * @param {integer} id.path.required - id of the Website
 * @returns {Website.model} 200 - deleted Website object
 * @returns {Error} 404 - Website not found
 */

router
    .get("/new", websiteController.createWebsite)
    .get("/", websiteController.getWebsites)
    .get("/:id", websiteController.getWebsitesById)
    .post("/", websiteController.addWebsite)
    .put("/", websiteController.updateWebsite)
    .post("/:id", websiteController.deleteWebsites)

module.exports = router;