const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",        // Usually "localhost"
  user: "root",             // Your MySQL username
  password: "vish@123",             // Your MySQL password
  database: "attendance_app" // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
