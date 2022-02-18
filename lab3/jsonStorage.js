const fs = require('fs');

class JsonStorage {

    constructor(filePath) {
        this.filePath = filePath;
    }
    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const items = JSON.parse(jsonText);
        return items;
    }
    writeItems(websites) {
        const jsonItem = JSON.stringify(websites, null, 4);
        fs.writeFileSync(this.filePath, jsonItem);
    }
};


module.exports = JsonStorage;