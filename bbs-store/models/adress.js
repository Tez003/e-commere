const db = require('../middleware/database');
const { use } = require('../routes/store');


module.exports = class Address {
    constructor( user_id, h_add, city, state, country, pincode, s_date, o_id) {
      
      this.user_id = user_id;
      this.h_add = h_add;
      this.city = city;
      this.state = state;
      this.country = country;
      this.pincode = pincode;
      this.s_date = s_date;
      this.o_id = o_id;
    }

    save() {
        return db.execute(
          'INSERT INTO shipping (user_id, h_add, city, state, country, pincode, s_date, o_id) VALUES (?, ?, ?, ?, ?,?, ?, ?)',
          [this.user_id, this.h_add,  this.city, this.state , this.country, this.pincode,  this.s_date, this.o_id]
        );
      }

}