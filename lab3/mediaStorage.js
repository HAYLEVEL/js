const fs = require('fs');
const JsonStorage = require('./jsonStorage.js');


class MediaStorage {
    constructor(mediaPath, mediaInfoPath) {
        this.mediaPath = mediaPath;
        this.jsonstorage = new JsonStorage(mediaInfoPath);
    }
    readMedia(id) {
        let mediaInfo = this.jsonstorage.readItems();
        let path;
        for (let i = 0; i < mediaInfo.items.length; i++) {
            if (mediaInfo.items[i].id == id) {
                path = mediaInfo.items[i].path;
                break;
            }
        }
        let mediaFile = fs.readFileSync(`${path}`, function(err, data) {
            if (err) {
                throw new Error(data);
            }
        });
        return mediaFile;
    }
    writeMedia(media) {
        let mediaInfo = this.jsonstorage.readItems();
        mediaInfo.items.push({
            id: mediaInfo.nextId,
            path: `${this.mediaPath}${media.name}`
        });
        mediaInfo.nextId++;
        this.jsonstorage.writeItems(mediaInfo)
        console.log(media.data);
        fs.writeFileSync(`${this.mediaPath}${media.name}`, media.data);
        return --mediaInfo.nextId;
    }
};

module.exports = MediaStorage;