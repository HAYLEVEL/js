const multer = require('multer');
const MediaRepository = require("../repositories/mediaRepository");
const path = require('path');
const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));

const upload = multer({

    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, mediaRepository.path)
        },
        filename: function (req, file, cb) {
            const fileFormat = file.mimetype.split('/')[1];
            cb(null, String(mediaRepository.getNextId()) + '.' + fileFormat);
        }
    }),
}).any()


module.exports = {
    postMedia(req, res) {
        upload(req, res, (err) => {
            if (err) {
                console.log('err ', err.message);
                res.status(500).send({ media: null, message: 'Internal Server Error ' });
                return;
            } else if (req.files) {
                res.status(201).send({ mediaId: mediaRepository.getNextId(), message: 'Media has been uploaded' });
                mediaRepository.incrementNextId();
            } else {
                res.status(400).send({ message: 'Bad request' });
            }
        })
    },

    getMediaById(req, res)
    {
        const name_ = mediaRepository.mediaPath(req.params.id);
        if (name_) {
            res.download(name_);
        }
        else {
            res.status(404).send({ message: 'Not found' });
        }
    }
}