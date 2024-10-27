const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost', // Database host
  user: 'root', // Database username
  password: 'mkhinchi786$', // Database password
  database: 'comments_db', // Database name
};

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL database connected successfully!');
    return connection;
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Ensure this line is present
