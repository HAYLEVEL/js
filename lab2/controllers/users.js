const UserRepository = require("../repositories/userRepository.js");
const router = require('express');
const { use } = require("../routes/users.js");

const users = new UserRepository("./data/users.json");


module.exports = {
        getUsers(req, res) {
            let page = 5;
            let per_page = 10;
            if (Number.isInteger(parseInt(req.query.page, 10))) {
                page = parseInt(req.query.page, 10);    
            }
            if (Number.isInteger(parseInt(req.query.per_page, 10))) {
                per_page = parseInt(req.query.per_page, 10);     
            }    
            res.send(JSON.stringify(users.getUsers().slice((page - 1) * per_page, per_page * page)));
    },

    getUserById(req, res) {
        const user = users.getUserById(req.params.id);
        if (user == undefined) {
            res.status(404).send({ message: 'Not found' });
        }
        else {
            res.send(JSON.stringify(user));
        }
    },

};
