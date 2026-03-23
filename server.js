const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (LOCAL for now)
const db = mysql.createConnection({
  host: "localhost", // ⚠️ will change later for online
  user: "root",
  password: "root123",
  database: "portfolio"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
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

// Start server (IMPORTANT FIX)
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running 🚀");
});
 