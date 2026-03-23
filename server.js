const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (LOCAL for now)
const db = mysql.createConnection({
  host: "shortline.proxy.rlwy.net",
  user: "root",
  password: "cXmPgELTN1KAkrfWFXyYFUcAzpeiPsXQ",
  database: "railway",
  port: 11276
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");

    // ✅ Create table automatically
    const createTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      message TEXT
   )
    `;

    db.query(createTable, (err) => {
      if (err) {
        console.log("Table Error:", err);
      } else {
        console.log("Table ready ✅");
      }
    });
  }
});

// API to add message
app.post("/add-message", (req, res) => {
  const { name, message } = req.body;

  const sql = "INSERT INTO messages (name, message) VALUES (?, ?)";

  db.query(sql, [name, message], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.send({ message: "Message saved ✅" });
    }
  });
});
 app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/test", (req, res) => {
  res.send("Test working ✅");
});
// Start server (IMPORTANT FIX)
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running 🚀");
});
