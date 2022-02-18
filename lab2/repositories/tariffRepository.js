const Tariff = require('../models/tariff.js');
const JsonStorage = require('../jsonStorage.js');
 
class TariffRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getTariffs() { 
		const items = this.storage.readItems();
		const tariffs = [];
		for(let i = 0; i < items.length; i++) {
			const buff = new Tariff();
			buff.id = items[i].id;
            buff.brand = items[i].brand;
            buff.fullname = items[i].fullname;
			buff.price = items[i].price;
			buff.registeredAt = items[i].registeredAt;
			buff.consumers = items[i].consumers;
			tariffs.push(buff);
		}
		return tariffs;
    }
 
    getTariffById(tariffId) {
		const tariffs = this.getTariffs();
		for (let i = 0; i < tariffs.length; i++) {
			if (tariffs[i].id == tariffId) {
				return tariffs[i];
			}	
		}
		return undefined;  
    }
 
    addTariff(tariffModel) {
        tariffModel.id = this.storage.nextId;
	   const tariffs = this.getTariffs();
	   tariffs.push(tariffModel);
	   this.storage.writeItems(tariffs);
	   this.storage.incrementNextId();  
	   return tariffModel;
    }
 
    updateTariff(tariffModel) {
		const tariffs = this.storage.readItems();
		for (let i = 0; i < tariffs.length; i++) {
			if (tariffs[i].id == tariffModel.id) {
				tariffs[i] = tariffModel;
				this.storage.writeItems(tariffs);
				return tariffModel;
			}	
		}
		return undefined;
    }
 
    deleteTariff(tariffId) {
		const tariffs = this.storage.readItems();
		for (let i = 0; i < tariffs.length; i++) {
			if (tariffs[i].id == tariffId) {
				let tariff = new Tariff();
				tariff.id = tariffs[i].id; 
				tariff.brand = tariffs[i].brand; 
				tariff.fullname = tariffs[i].fullname; 
				tariff.price = tariffs[i].price; 
				tariff.registeredAt = tariffs[i].registeredAt;
				tariff.consumers = tariffs[i].consumers; 
				tariffs.splice(i, 1);
				this.storage.writeItems(tariffs);
				return tariff;
			}	
		}
		return undefined;
    }
};
 
module.exports = TariffRepository;