const userController = require('../controllers/users.js');
const express = require('express');

const router = express.Router();

/**
 * page of users
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User - eg: 1
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 * @returns {Error} 400 Bad request
 * @returns {Error} 500 Server error
 */
router.get("/:id", userController.getUserById);

 /**
 * Get a page of users
 * @route GET /api/users
 * @group Users - user operations
 * @param {integer} page.query - items per number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<User>} 200 User - all users
 * @returns {Error} 400 Bad request
 * @returns {Error} 500 Server error
 */

router.get("/", userController.getUsers);


module.exports = router
