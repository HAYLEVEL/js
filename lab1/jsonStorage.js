const fs = require("fs");
class JsonStorage {
    constructor(filePath) {
        this.filePath = filePath;
    }
 
    get nextId() {
        const contents = fs.readFileSync(this.filePath);
        return JSON.parse(contents).nextId;
    }
 
    incrementNextId() { 
        const contents = fs.readFileSync(this.filePath);
        const a = JSON.parse(contents);
        a.nextId = this.nextId + 1;
        fs.writeFileSync(this.filePath, JSON.stringify(a, null, 2));
    }
 
    readItems() {
        const contents = fs.readFileSync(this.filePath);
        return JSON.parse(contents).items;
    }
 
    writeItems(items) {
        const contents = fs.readFileSync(this.filePath);
        const a = JSON.parse(contents);
        a.items = items;
        fs.writeFileSync(this.filePath, JSON.stringify(a, null, 2));
    }
};
 
module.exports = JsonStorage;
