// repositories/userRepository.js
const User = require('../models/user.js');
const JsonStorage = require('../jsonStorage.js');
 
class UserRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getUsers() { 
		const items = this.storage.readItems();
		const users = [];
		for(let i = 0; i < items.length; i++) {
			const buff = new User();
			buff.id = items[i].id;
			buff.login = items[i].login;
			buff.fullname = items[i].fullname;
			buff.role = items[i].role;
			buff.registeredAt = items[i].registeredAt;
			buff.avaUrl = items[i].avaUrl;
			buff.isEnabled = items[i].isEnabled;
			users.push(buff);
		}
		return users;
    }
 
    getUserById(userId) {
		const users = this.getUsers();
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == userId) {
				return users[i];
			}	
		}
		return undefined;  
    }
 
    addUser(userModel) {
	   userModel.id = this.storage.nextId;
	   const users = this.getUsers();
	   users.push(userModel);
	   this.storage.writeItems(users);
	   this.storage.incrementNextId();
	   return userModel.id;  
    }
 
    updateUser(userModel) {
		const users = this.storage.readItems();
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == userModel.id) {
				users[i] = userModel;
				this.storage.writeItems(users);
				return true;
			}	
		}
		return undefined;
    }
 
    deleteUser(userId) {
		const users = this.storage.readItems();
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == userId) {
				users.splice(i, 1);
				this.storage.writeItems(users);
				return true;
			}	
		}
		return undefined;
    }
};
 
module.exports = UserRepository;