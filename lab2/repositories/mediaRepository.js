const fs = require("fs");
class MediaRepository {

    constructor(path) {
        this.path = path;
    }

    getNextId() {
        const next_id = fs.readFileSync(this.path + "/id.txt", "utf8");
        return next_id;
    }

    incrementNextId() {
        let next_id = this.getNextId();
        next_id++;
        fs.writeFileSync(this.path + "/id.txt", next_id.toString());
    }

    mediaPath(name) {
        if (fs.existsSync(this.path + '/' + name)) {
            return this.path + '/' + name;    
        }
        return false;
    }
};

module.exports = MediaRepository;