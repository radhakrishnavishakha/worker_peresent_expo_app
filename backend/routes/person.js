const express = require("express");
const db = require("../db");

const router = express.Router();

// ===== Add Person =====
router.post("/add", (req, res) => {
  const { user_id, name, salary } = req.body;

  if (!user_id || !name || !salary) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const query = "INSERT INTO persons (user_id, name, salary) VALUES (?, ?, ?)";
  db.query(query, [user_id, name, salary], (err, result) => {
    if (err) {
      console.error("Error adding person:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Person added successfully", person_id: result.insertId });
  });
});

// ===== Delete Person =====
router.delete("/delete/:person_id", (req, res) => {
  const person_id = req.params.person_id;
  if (!person_id) {
    return res.status(400).json({ error: "Person ID is required" });
  }

  const query = "DELETE FROM persons WHERE person_id = ?";
  db.query(query, [person_id], (err) => {
    if (err) {
      console.error("Error deleting person:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Person deleted successfully" });
  });
});

// ===== Get Persons by User ID =====
router.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const query = "SELECT person_id, name, salary FROM persons WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching persons:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
