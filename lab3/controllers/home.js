const user_rep = require('../repositories/userRepository.js');
module.exports = {
    getIndex(req, res) {
        res.render('index');
    },
    getAbout(req, res) {
        res.render('about');
    }
};