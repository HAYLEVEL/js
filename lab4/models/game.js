/**
 * @typedef Game
 * @property {string} id
 * @property {string} name.required
 * @property {string} developer
 * @property {integer} price - in hryvnia
 * @property {integer} score
 * @property {string} date - when the game presented
 * @property {string} imageUrl -url
*/

class Game
{
    constructor(id, name, developer, price, score, date, imageUrl)
    {
        this.id = id;  // number
        this.name = name;  // string
        this.developer = developer; // string
        this.price = price; //number
        this.score = score; //number
        this.date = date; //date
        this.imageUrl = imageUrl; //string
    }
 };
 
 module.exports = Game;