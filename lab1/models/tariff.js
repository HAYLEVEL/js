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