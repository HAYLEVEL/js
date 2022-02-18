const user_rep = require('../repositories/userRepository.js');
const { use } = require('../routes/users.js');
const userRepository = new user_rep("data/users.json");
module.exports = {
    getUsers(req, res) {
        let page = Number.parseInt(req.param("page") || 1);
        let records = Number.parseInt(req.param("per_page") || 5);
        if (!Number.isInteger(page) || !Number.isInteger(records)) {
            res.statusCode = 404;
            let arr = []
            res.render('users', { arr });
        } else {
            res.statusCode = 200;
            let arr = userRepository.getUsers();
            let record_count = arr.length;
            let page_count = Math.ceil(record_count / records);
            let left = records * (page - 1);
            let right = records * page
            let current = page;
            let next = page + 1;
            let prev = page - 1;
            let currnall = `${page}/${page_count}`;
            arr = arr.slice(left, right);
            if (page < 1) {
                arr = [];
                prev = 0;
                next = 1;
                res.render('users', { arr, current, next, prev, currnall });
            } else if (page > page_count) {
                arr = [];
                next = page_count + 1;
                prev = 2;
                res.render('users', { arr, current, next, prev, currnall });
            } else {
                res.render('users', { arr, current, next, prev, currnall });
            }
        }
    },
    getUserById(req, res) {
        const user = userRepository.getUserById(req.params.id);
        res.statusCode = 200;
        res.render('user', { user });
    }
};