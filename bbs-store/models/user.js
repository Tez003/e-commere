const db = require('../middleware/database');


module.exports = class User {
  constructor( name, username, mail_id,mob_no,pass, admin = 'n') {
    
    this.name = name;
    this.username = username;
    this.mail_id = mail_id ;
    this.mob_no = mob_no;
    this.pass = pass;
    this.admin = admin;
  }

  save() {
    return db.execute(
      'INSERT INTO user_details (name,username,mail_id,mob_no,pass,admin) VALUES (?, ?, ?, ?, ?, ?)',
      [this.name, this.username,this.mail_id, this.mob_no , this.pass ,this.admin  ]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM user_details WHERE user_id = ? ',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM user_details');
  }

  static findByEmail(email) {
    return db.execute('SELECT * FROM user_details WHERE mail_id = ? ', [email]);
  }

  static findByUsername(userName) {
    return db.execute('SELECT * FROM user_details WHERE username = ? ',[userName]);
  }

  
};
