const db = require('../middleware/database');


module.exports = class Product {
  constructor( name, imageUrl, description,tag,quant,seller_id, price) {
    
    this.p_name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.category = tag;
    this.quant = quant;
    this.seller_id = seller_id;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (p_name, image_url, descript, category, seller_id, price, quant) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [this.p_name, this.imageUrl,this.description, this.category , this.seller_id ,this.price, this.quant   ]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE p_id = ?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products WHERE quant > 0');
  }

  static Update(quant,p_id){
    return db.execute('UPDATE products set quant = quant - ? WHERE p_id = ?',[quant, p_id]);
  }

  static findByCategory(category) {
    return db.execute('SELECT * FROM products WHERE category = ?',[category]);
  }


  static fetchByUserId(seller_id) {
    return db.execute('SELECT * FROM products WHERE seller_id <> ?',[seller_id]);
  }
 
  static getPrice(id){
    return db.execute('SELECT price from products WHERE p_id = ?', [id]);
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.p_id = ?', [id]);
  }

  static getQuantity(id){
    return db.execute('SELECT quant FROM products WHERE products.p_id = ?', [id]);
  }
  static getBySeller(seller_id){
    return db.execute('SELECT * FROM products WHERE products.seller_id = ?',[seller_id]);
  }
};
