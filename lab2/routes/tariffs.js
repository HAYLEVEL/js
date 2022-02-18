const tariffController = require('../controllers/tariffs.js');
const express = require('express');
const Tariff = require('../models/tariff.js');

const router = express.Router();

/**
 * get tariffs
 * @route GET /api/tariffs/{id}
 * @group Tariffs - tariff operations
 * @param {integer} id.path.required - id of the Tariff - eg: 1
 * @returns {Tariff.model} 200 - Tariff object
 * @returns {Error} 404 - Tariff not found
 * @returns {Error} 400 Bad request
 * @returns {Error} 500 Server error
 */
router.get("/:id", tariffController.getTariffById);

 /**
 * Get a page of users
 * @route GET /api/tariff
 * @group Users - user operations
 * @param {integer} page.query - items per number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<Tariff>} 200 Tariff - all tariffs
 * @returns {Error} 400 Bad request
 * @returns {Error} 500 Server error
 */
router.get("/", tariffController.getTariffs);

/**
 * add new tariff
 * @route POST /api/tariffs
 * @group Tariffs - tariff operations
 * @param {Tariff.model} id.body.required - new Tariff object
 * @returns {Tariff.model} 201 - added Tariff object
 */
router.post("/", tariffController.addTariff);

/**
 * TODO: Add some comment here
 * @route PUT /api/tariffs
 * @group Tariffs - tariff operations
 * @param {Tariff.model} id.body.required - new Tariff object
 * @returns {Tariff.model} 200 - changed Tariff object
 */
router.put("/", tariffController.updateTariff);

/**
 * Delete tariff by id
 * @route DELETE /api/tariffs/{id}
 * @group Tariffs - tariff operations
 * @param {integer} id.path.required - id of the Tariff - eg: 1
 * @returns {Tariff.model} 200 - deleted Tariff object
 * @returns {Error} 404 - Tariff not found
 */
router.delete("/:id", tariffController.deleteTariff);

module.exports = router