const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // keep your password same
  database: "portfolio"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ API to add message
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

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});