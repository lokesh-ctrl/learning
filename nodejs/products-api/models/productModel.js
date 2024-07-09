const connection = require('../db/connection');

const Product = {
  getAll: (callback) => {
    connection.query('SELECT * FROM products', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },
  create: (product, callback) => {
    connection.query('INSERT INTO products SET ?', product, callback);
  },
  update: (id, product, callback) => {
    connection.query('UPDATE products SET ? WHERE id = ?', [product, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM products WHERE id = ?', [id], callback);
  }
};

module.exports = Product;
