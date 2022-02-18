//models/website.js

/**
 * @typedef Website
 * @property {integer} id
 * @property {string} name.required - unique name
 * @property {string} address.required - unique address
 * @property {integer} visits_per_day - amount of visits per day
 * @property {integer} count_of_ad_bunners - amount of bunners on pages
 * @property {date} date_of_creating - the date of creating website
 */

class Website {

    constructor(id, name, address, visits_per_day, count_of_ad_bunners, date_of_creating, description, url) {
        this.id = id; // id
        this.name = name; // string
        this.address = address; // string
        this.visits_per_day = visits_per_day; //number
        this.count_of_ad_bunners = count_of_ad_bunners; //number
        this.date_of_creating = date_of_creating; // Date ISO 8601
        this.description = description //string
        this.url = url;
    }
};

module.exports = Website;