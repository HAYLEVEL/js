/**
 * @typedef Tariff
 * @property {integer} id
 * @property {string} brand.required - unique username
 * @property {string} fullname - fullname users
 * @property {float} price - price
 * @property {date} registeredAt - date
 * @property {float} consumers - number of consumers
 */

class Tariff {

    constructor(id, brand, fullname, price, registeredAt, consumers) {
        this.id = id;  // number
        this.brand = brand;  // string
        this.fullname = fullname;  // string
        this.price = price;
        this.registeredAt = registeredAt;
        this.consumers = consumers;
    }
 };
 
 module.exports = Tariff;