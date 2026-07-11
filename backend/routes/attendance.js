const express = require("express");
const router = express.Router();
const db = require("../db");

// ===== GET Attendance for a person/month/year =====
router.get("/:person_id/:year/:month", (req, res) => {
  const { person_id, year, month } = req.params;

  db.query(
    "SELECT data FROM attendance WHERE person_id = ? AND year = ? AND month = ?",
    [person_id, year, month],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.json({ data: {} }); // No data yet
      }

      res.json({ data: results[0].data });
    }
  );
});

// ===== SAVE / UPDATE Attendance =====
router.post("/save", (req, res) => {
  const { person_id, year, month, data } = req.body;

  if (!person_id || !year || !month || !data) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const jsonData = JSON.stringify(data);

  const query = `
    INSERT INTO attendance (person_id, year, month, data)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP
  `;

  db.query(query, [person_id, year, month, jsonData], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Attendance saved successfully" });
  });
});
router.delete("/delete/:person_id/:year", (req, res) => {
  const { person_id, year } = req.params;

  const query = "DELETE FROM attendance WHERE person_id = ? AND year = ?";
  db.query(query, [person_id, year], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: `${year} का डेटा सफलतापूर्वक हटाया गया` });
  });
});

module.exports = router;
