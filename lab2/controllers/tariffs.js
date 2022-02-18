const TariffRepository = require("../repositories/tariffRepository.js");
const router = require('express');
const { use } = require("../routes/tariffs.js");
const Tariff = require("../models/tariff.js");

const tariffs = new TariffRepository("./data/tariffs.json");

module.exports = {
        getTariffs(req, res) {
            let page = 5;
            let per_page = 10;
            if (Number.isInteger(parseInt(req.query.page, 10))) {
                page = parseInt(req.query.page, 10);    
            }
            if (Number.isInteger(parseInt(req.query.per_page, 10))) {
                per_page = parseInt(req.query.per_page, 10);     
            }    
            res.json(JSON.stringify(tariffs.getTariffs().slice((page - 1) * per_page, per_page * page)));  
        },

    getTariffById(req, res) {
        const tariff = tariffs.getTariffById(req.params.id);
        if (tariff == undefined) {
            res.status(404).send({ message: 'Not found' });
        }
        else {
            res.send(JSON.stringify(tariff));
        }
    },

    addTariff(req, res) {
        const new_Tar = new Tariff();
        console.log(req.body);
        new_Tar.brand = req.body.brand;
        new_Tar.fullname = req.body.fullname;
        new_Tar.price = req.body.price;
        new_Tar.registeredAt = req.body.registeredAt;
        new_Tar.consumers = req.body.consumers;
        if (new_Tar.brand.length == 0) {
            res.status(400).send({ message: 'Bad request' });
        }
        else {
            res.status(201).send({ tariff: tariffs.addTariff(new_Tar), message: 'Tariff has been created' });
        }
    },
    updateTariff(req, res) {
        const new_Tar = new Tariff();
        console.log(req.body);
        new_Tar.id = req.body.id;
        new_Tar.brand = req.body.brand;
        new_Tar.fullname = req.body.fullname;
        new_Tar.price = req.body.price;
        new_Tar.registeredAt = req.body.registeredAt;
        new_Tar.consumers = req.body.consumers;
        if (new_Tar.brand.length == 0) {
            res.status(400).send({ message: 'Bad request' });
        }
        else if(!res.send(tariffs.updateTariff(new_Tar))) {
            res.status(404).send({ message: 'Not found' });
        }
        else {
            res.status(201).send({ tariff: new_Tar, message: 'Tariff has been updated' });
        }
    },
    deleteTariff(req, res) {
        const delete_tar = tariffs.deleteTariff(req.body.id);
        if(delete_tar) {
            res.send({ message: 'Tariff has been deleted', tariff: delete_tar });
        }
        else {
            res.status(404).send({ message: 'Not found' });
        }
    },
};
