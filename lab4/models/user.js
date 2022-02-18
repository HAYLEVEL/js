/**
 * @typedef User
 * @property {string} id
 * @property {string} login.required - unique username
 * @property {string} fullname - your name
 * @property {integer} role.required - role
 * @property {string} registeredAt - date when registered
 * @property {string} avaUrl - Your avatar
 * @property {boolean} isEneble.required - is the account available
 */

class User
{
    constructor(login, fullname, role, isEnable, registeredAt)
    {
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role; //number
        this.registeredAt = registeredAt; //date
        this.isEnable = isEnable; //bool
    }
 };
 
 module.exports = User;