//models/user.js

/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - unique username
 * @property {string} fullname - user`s fullname
 * @property {integer} role - user`s role
 * @property {date} registeredAt - the day when user registered in the system
 * @property {string} avaUrl - url of the picture
 * @property {bool} isEnabled - is user enabled
 */
class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled, biography) {
        this.id = id; // number
        this.login = login; // string
        this.fullname = fullname; // string
        this.role = role; //number 0 || 1
        this.registeredAt = registeredAt; // Date ISO 8601
        this.avaUrl = avaUrl; //strign (URL)
        this.isEnabled = isEnabled; //bool
        this.biography = biography; //bool
    }
};

module.exports = User;