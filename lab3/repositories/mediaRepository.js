const cons = require('consolidate');
const MediaStorage = require('../mediaStorage');

class MediaRepository {

    constructor() {
        this.storage = new MediaStorage('./data/media/', './data/media.json');
    }

    addMedia(media) {
        this.storage.writeMedia(media.photoFile);
        return media;
    }

    getMediaById(id) {
        return this.storage.readMedia(id);
    }
};


module.exports = MediaRepository;