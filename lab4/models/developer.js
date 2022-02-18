/**
 * @typedef Developer
 * @property {string} id
 * @property {string} name.required
 * @property {string} developer
 * @property {integer} price - in hryvnia
 * @property {integer} score
 * @property {string} date - when the game presented
 * @property {string} imageUrl -url
*/

class Developer
{
    constructor(id, name, founded, headquarters)
    {
        this.id = id;  // number
        this.name = name;  // string
        this.founded = founded; // date
        this.headquarters = headquarters; // number
    }
 };
 
 module.exports = Developer;