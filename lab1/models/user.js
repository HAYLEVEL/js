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