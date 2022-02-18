const MediaRepository = require('../repositoriesDB/mediaRepository.js');
const mediaStorage = new MediaRepository();
//
const Game = require('./../models/game');
const gameRepository = require('../repositoriesDB/gameRepository.js');
const gameStorage = new gameRepository();
//
const developerRepository = require('../repositoriesDB/developerRepository.js');
const { json } = require('express');
const developerStorage = new developerRepository();


module.exports =
{
    async getGames(req, res, next) {
        try {
            let jsonArray = await gameStorage.getGames();
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
            let games = [];
            var counter = 0;
            for (var i = 0 + skipped_items; i < per_page + skipped_items && i < jsonArray.length; i++) {
                games[counter] = jsonArray[i];
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
            res.render('games',
                {
                    games,
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
    async getGameById(req, res, next) {
        try {
            const found = await gameStorage.getGameById(req.params.id);
            if (found != null) {

                res.render('game',
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
    async renderAddGame(req, res, next) {
        try {
            const developers = await developerStorage.getDevelopers();
            res.render('game_new',
                {
                    developers
                })
        }
        catch (err) {
            next(err);
        }
    },
    async renderChangeGame(req, res, next) {
        try {
            const game = await gameStorage.getGameById(req.params.id);
            const developers = await developerStorage.getDevelopers();
            if (game != null) {

                res.render('game_change',
                    {
                        game,
                        developers
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
    async addGame(req, res, next) {
        try {
            const file = req.files.image;
            const url = await mediaStorage.addMedia(file.tempFilePath);
            let new_item = new Game
                (
                    req.body.id,
                    req.body.name,
                    req.body.developer,
                    req.body.price,
                    req.body.score,
                    req.body.date,
                    url.url
                )
            const NewGame = await gameStorage.addGame(new_item);
            if (NewGame == null)
                res.sendStatus(500);
            else {
                res.status(201);
                res.redirect("/games/" + NewGame._id);
            }
        }
        catch (err) {
            next(err);
        }

    },
    async updateGame(req, res, next) {
        try {
            const id = req.params.id;
            let new_item = new Game
                (
                    id,
                    req.body.name,
                    req.body.developer,
                    req.body.price,
                    req.body.score,
                    req.body.date
                )
            if (await gameStorage.updateGame(new_item)) {
                res.status(201);
                res.redirect("/games/" + id);
            }
            else
            {
                res.sendStatus(404);
            }
        }
        catch (err) {
            next(err);
        }
    },
    async deleteGame(req, res, next) {
        try {
            const item_id = req.params.id;
            if (await gameStorage.delteGame(item_id)) {
                res.redirect("/games");
            }
            else
                res.sendStatus(404);
        }
        catch (err) {
            next(err);
        }
    }
}