const User = require('../models/user');
const JsonStorage = require('../jsonStorage');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getUsers() {
        const items = this.storage.readItems();
        const arr = [];
        for (let i of items) {
            arr.push(new User(i.id, i.login, i.fullname, i.role, i.registeredAt, i.avaUrl, i.isEnabled, i.biography))
        }
        return arr;
    }

    getUserById(id) {
        id = parseInt(id);
        const items = this.storage.readItems();
        for (let item of items) {
            if (item.id === id) {
                return new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled, item.biography);
            }
        }
        return null;
    }
};


module.exports = UserRepository;