/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - unique username
 * @property {string} fullname - fullname
 * @property {integer} role - role on resourse
 * @property {string} registeredAt - date
 * @property {string} avaUrl - url
 * @property {integer} isEnabled - activity
 */

class User {

   constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
       this.id = id;  // number
       this.login = login;  // string
       this.fullname = fullname;  // string
       this.role = role;
       this.registeredAt = registeredAt;
       this.avaUrl = avaUrl;
       this.isEnabled = isEnabled;
       // TODO: More fields
   }
};

module.exports = User;