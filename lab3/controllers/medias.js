const media_rep = require('../repositories/mediaRepository.js');
const mediaRepository = new media_rep();
module.exports = {
    getMediaById(req, res){
        res.set("Content-Type", "application/json");
        let media;
        try{
            media = mediaRepository.getMediaById(req.params.id);
            res.send(`Media with id ${req.params.id}: ${JSON.stringify(media, null, 4)}`);
        }
        catch(err){
            res.statusCode = 404;
            res.send(JSON.stringify('Media with this id wasnt found'));
        }
    },
    addMedia(req, res){
        res.statusCode = 201;
        mediaRepository.addMedia(req.files.image.data);
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(req.files), null, 4);
    }
};
