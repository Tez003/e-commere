const db = require('../middleware/database');
const { getPrice } = require('./product');

module.exports = class Order {
    constructor( userid, pid, quan, tot, Buy ) {
      
      
      this.user_id = userid;
      this.p_id    = pid;
      this.quantity = quan;
      this.total =  tot;
      this.Buy = Buy;
    }


    save() {
        return db.execute(
          'INSERT INTO orders (user_id, p_id, quantity, total, Buy) VALUES (?, ?, ?, ?, ?)',
          [this.user_id, this.p_id, this.quantity, this.total , this.Buy ]
        );
      }

    static fetchCart(id){
      return db.execute(
        'SELECT * FROM cart WHERE user_id = ?',[id]
      );
    }

    static checkExisting(id, p_id){
      return db.execute(
        'SELECT quantity, total FROM orders WHERE user_id = ? AND p_id = ?',[id, p_id]
      );
    }



    static cartUpdate(id, p_id, quantity, total){
      return db.execute(
        'UPDATE orders SET quantity = ?, total = ? WHERE user_id = ? AND p_id = ? AND buy = "n"',[quantity, total, id, p_id]
      );
    }

    static deleteById(id, user_id) {
      return db.execute('DELETE FROM orders WHERE p_id = ? AND user_id = ? AND buy="n"' ,[id, user_id]);
    }


};
