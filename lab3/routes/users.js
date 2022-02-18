const express = require('express');
const userController = require('../controllers/users.js');
const router = express.Router();

/**
 * Description of getting user by id
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 */

/**
 * Description of getting all users
 * @route GET /api/users
 * @group Users - user operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<User>} User - a page with users
 */


router
    .get("/:id", userController.getUserById)
    .get("/", userController.getUsers)

module.exports = router;