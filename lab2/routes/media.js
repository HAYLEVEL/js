const mediaController = require('../controllers/media.js');
const express = require('express');
const router = express.Router();

/**
 * @route GET /api/media/{id}
 * @group Media - Media operations
 * @param {integer} id.path.required - id of the Media - eg: 1
 * @returns {file} 200 - Media object
 * @returns {Error} 404 - Media not found
 */
router.get("/:id", mediaController.getMediaById);

/**
 * @route POST /api/media
 * @group Media - media operations
 * @comsumes multipart/form-data
 * @param {file} image.formData.required - new Media object
 * @returns {file} 201 - added Media object
 * @returns {Error} 404 - Media not posted
 */
router.post("/", mediaController.postMedia);

module.exports = router