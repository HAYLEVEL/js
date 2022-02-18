const JsonStorage = require('../jsonStorage');
const Website = require('../models/website');
class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addWebsite(entityModel) {
        let websites = this.storage.readItems();
        const nextId = websites.nextId
        entityModel.id = nextId;
        websites.nextId++;
        websites.items.push(entityModel);
        this.storage.writeItems(websites);
        return entityModel.id;
    }
    getWebsites() {
        const items = this.storage.readItems().items;
        const arr = [];
        for (let i of items) {
            arr.push(new Website(i.id, i.name, i.address, i.visits_per_day, i.count_of_ad_bunners, i.date_of_creating, i.description, i.url))
        }
        return arr;
    }
    getWebsitesById(entityId) {
        entityId = parseInt(entityId);
        const items = this.storage.readItems().items;
        for (let i of items) {
            if (entityId === i.id) {
                return new Website(i.id, i.name, i.address, i.visits_per_day, i.count_of_ad_bunners, i.date_of_creating, i.description, i.url);
            }
        }
        return null;
    }
    updateWebsite(entityModel) {
        let websites = this.storage.readItems();
        for (let i = 0; i < websites.items.length; i++) {
            if (entityModel.id == websites.items[i].id) {
                websites.items[i] = entityModel;
                this.storage.writeItems(websites);
                return websites.items[i];
            }
        }
        return null;
    }
    deleteWebsites(entityId) {
        entityId = parseInt(entityId);
        let websites = this.storage.readItems();
        for (let i = 0; i < websites.items.length; i++) {
            if (entityId === websites.items[i].id) {
                const deletedWebsite = websites.items[i];
                websites.items.splice(i, i + 1);
                websites.nextId--;
                this.storage.writeItems(websites);
                return deletedWebsite;
            }
        }
        return null;
    }
};


module.exports = UserRepository;