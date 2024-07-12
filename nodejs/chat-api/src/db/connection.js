const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'userpassword',
  database: 'productdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      stocked BOOLEAN NOT NULL
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }
    console.log('Table "products" is ready.');
  });
});

module.exports = connection;
