/**
 * @typedef Media
 * @property {integer} id
 * @property {file} file.required
*/

class Media
{
    constructor(id, file)
    {
        this.id = id;  // number
        this.file = file; //file
    }
 };
 
 module.exports = Media;