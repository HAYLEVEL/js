const site_rep = require('../repositories/WebsiteRepository.js');
const media_rep = require('../repositories/mediaRepository.js');
const e = require('express');
const websiteRepository = new site_rep("./data/Websites.json");
const mediaRepository = new media_rep();
module.exports = {
    getWebsites(req, res) {
        let page = Number.parseInt(req.param("page") || 1);
        let records = Number.parseInt(req.param("per_page") || 5);
        let name = req.param("name") || "";
        if (!Number.isInteger(page) || !Number.isInteger(records)) {
            res.statusCode = 404;
            let arr = []
            res.render('websites', { arr });
        } else {
            res.statusCode = 200;
            let arr = websiteRepository.getWebsites();
            if (name !== undefined) {
                arr = arr.filter(el => el.name.startsWith(name));
            }
            let filtered = [];
            filtered = arr.concat(filtered);
            let record_count = arr.length;
            let page_count = Math.ceil(record_count / records);
            let left = records * (page - 1);
            let right = records * page
            let current = page;
            let next = page + 1;
            let prev = page - 1;
            let currnall = `${page}/${page_count}`;
            arr = arr.slice(left, right);
            let str = '';
            let start = name;
            if (filtered.length === 0) {
                str = `Веб-сайты, название которых начинаются с ${name}, не найдены`;
            } else {
                str = `Веб-сайты, название которых начинаются с ${name}`;
            }
            if (page < 1) {
                arr = [];
                prev = 0;
                next = 1;
                res.render('websites', { arr, str, current, next, prev, currnall, start, name });
            } else if (page > page_count) {
                arr = [];
                next = page_count + 1;
                prev = page_count;
                res.render('websites', { arr, str, current, next, prev, currnall, start, name });
            } else {
                res.render('websites', { arr, str, current, next, prev, currnall, start, name });
            }
        }
    },
    getWebsitesById(req, res) {
        res.statusCode = 200;
        const website = websiteRepository.getWebsitesById(req.params.id)
        res.render('website', { website });
    },
    addWebsite(req, res) {
        if (req.body.name === undefined || req.body.address === undefined) {
            res.set("Content-Type", "application/json");
            res.statusCode = 400;
            res.send(JSON.stringify('Bad request'));
        } else {
            res.statusCode = 201;
            mediaRepository.addMedia(req.files);
            let site = req.body;
            console.log(__dirname);
            site.url = `/data/media/${req.files.photoFile.name}`;
            const id = websiteRepository.addWebsite(site);
            const website = websiteRepository.getWebsitesById(id);
            res.redirect(`/websites/${id}`);
        }
    },
    updateWebsite(req, res) {
        res.set("Content-Type", "application/json");
        const website = websiteRepository.updateWebsite(req.body)
        if (website === null) {
            res.statusCode = 404;
            res.send(`Any website wasnt updated`);
        } else if (req.body.name === undefined || req.body.address === undefined) {
            res.statusCode = 400;
            res.send(JSON.stringify('Bad request'));
        } else {
            res.send(`Updated website: ${JSON.stringify(website,null,4)}`);
        }
    },
    deleteWebsites(req, res) {
        res.statusCode = 200;
        const website = websiteRepository.deleteWebsites(req.params.id)
        res.redirect(`/websites`);
    },
    createWebsite(req, res) {
        res.render('new');
    }
};