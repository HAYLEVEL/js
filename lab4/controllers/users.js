const User = require("../models/user.js");
var userRepository = require('../repositoriesDB/userRepository.js');
const userStorage = new userRepository();

module.exports =
{
    async getUsers(req, res, next) {
        try {
            let jsonArray = await userStorage.getUsers();
            let page = parseInt(req.query.page) || 1;
            let per_page = 4;
            let skipped_items = (page - 1) * per_page;
            //

            let users = [];
            var counter = 0;
            for (var i = 0 + skipped_items; i < per_page + skipped_items && i < jsonArray.length; i++) {
                users[counter] = jsonArray[i];
                counter++;
            }

            let pages_total = Math.ceil(jsonArray.length / per_page);
            let pageNext = page + 1;
            let pagePrev = page - 1;
            let actvPrev;
            let actvNext;
            if (page <= 1)
                actvPrev = "disabled";
            if (page >= pages_total)
                actvNext = "disabled";
            res.render('users',
                {
                    users,
                    page,
                    pageNext,
                    pagePrev,
                    actvPrev,
                    actvNext,
                })
        }
        catch (err) {
            next(err);
        }
    },
    async getUserById(req, res, next) {
        try
        {
            const found = await userStorage.getUserById(req.params.id);
            if (found != null) {

                res.render('user',
                    {
                        found
                    });
            }
            else {
                res.sendStatus(404);
            }
        }
        catch(err)
        {
            next(err);
        }
    },
    async addUser(req, res, next) {
        try {
            let new_item = new User
                (
                    req.body.login,
                    req.body.fullname,
                    0,
                    true,
                )
            const NewUser = await userStorage.addUser(new_item);
            if (NewUser == null)
                res.sendStatus(500);
            else
            {
                res.status(201);
                res.redirect("/users/" + NewUser._id);
            }
        }
        catch (err) {
            next(err);
        }

    }
}