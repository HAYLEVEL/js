const Developer = require('./../models/developer');
const developerRepository = require('../repositoriesDB/developerRepository.js');
const developerStorage = new developerRepository();


module.exports =
{
    async getDevelopers(req, res, next) {
        try {
            let jsonArray = await developerStorage.getDevelopers();
            let page = parseInt(req.query.page) || 1;
            const searchBy = req.query.search || "";
            let per_page = 4;
            let skipped_items = (page - 1) * per_page;
            //
            for (var i = 0; i < jsonArray.length; i++) {
                var str = jsonArray[i].name;
                if (!str.includes(searchBy)) {
                    jsonArray.splice(i, 1);
                    i--;
                }
            }
            //
            let developers = [];
            var counter = 0;
            for (var i = 0 + skipped_items; i < per_page + skipped_items && i < jsonArray.length; i++) {
                developers[counter] = jsonArray[i];
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
            res.render('developers',
                {
                    developers,
                    page,
                    pageNext,
                    pagePrev,
                    actvPrev,
                    actvNext,
                    searchBy
                })
        }
        catch (err) {
            next(err);
        }
    },
    async getDeveloperById(req, res, next) {
        try {
            const found = await developerStorage.getDeveloperById(req.params.id);
            if (found != null) {

                res.render('developer',
                    {
                        found
                    });
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (err) {
            next(err);
        }
    },
    async addDeveloper(req, res, next) {
        try {
            let new_item = new Developer
                (
                    req.body.id,
                    req.body.name,
                    req.body.founded,
                    req.body.headquarters
                )
            const NewDeveloper = await developerStorage.addDeveloper(new_item);
            if (NewDeveloper == null)
                res.sendStatus(500);
            else
            {
                res.status(201);
                res.redirect("/developers/" + NewDeveloper._id);
            }
        }
        catch (err) {
            next(err);
        }

    },
    async updateDeveloper(req, res, next) {
        try {
            let new_item = new Developer
                (
                    req.body.id,
                    req.body.name,
                    req.body.founded,
                    req.body.headquarters
                )
            if (await developerStorage.updateDeveloper(new_item)) {
                res.json(await developerStorage.getDeveloperById(req.body.id));
            }
            else
                res.sendStatus(404);
        }
        catch (err) {
            next(err);
        }
    },
    async deleteDeveloper(req, res, next) {
        try {
            const item_id = req.params.id;
            if (await developerStorage.delteDeveloper(item_id)) {
                res.redirect("/developers");
            }
            else
                res.sendStatus(404);
        }
        catch (err) {
            next(err);
        }
    }
}