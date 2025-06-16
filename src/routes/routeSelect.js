const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT trip.route_id AS id, route.route_name AS name FROM trip JOIN route ON trip.route_id = route.route_id"
    );
    res.json(result.rows);
  } catch {
    console.error("Error retrieving route list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
