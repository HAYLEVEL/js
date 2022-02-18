var mediaRepository = require('../repositories/mediaRepository');
const Media = require('./../models/media');
const mediaStorage = new mediaRepository('./data/media.json');

module.exports =
{
    async addMedia(req, res, next) {
        try {
            let new_item = new Media
                (
                    req.body.id,
                    req.files
                )
            res.status(201).json(mediaStorage.addMedia(new_item));
        }
        catch (err) {
            next(err);
        }
    }
}