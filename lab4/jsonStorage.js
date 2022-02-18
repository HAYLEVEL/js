const fs = require('fs');

class JsonStorage
{
    constructor(filePath)
    {
        this.filePath = filePath;
    }
    
    readItems()
    {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        return jsonArray;
    }

    get nextId()
    {
        return this.readItems()['nextId'];
    }

    incrementNextId()
    {
        const jsonArray = this.readItems();
        jsonArray['nextId']++;
        const json = JSON.stringify(jsonArray, null, 4);
        fs.writeFileSync(this.filePath, json);
    }

    writeItems(items)
    {
        const jsonArray = this.readItems();
        jsonArray['items']=items['items'];
        const json = JSON.stringify(jsonArray, null, 4);
        fs.writeFileSync(this.filePath, json);
    }
};

module.exports = JsonStorage;